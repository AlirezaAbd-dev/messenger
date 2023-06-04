import { NextRequest, NextResponse as res } from "next/server";

import getHeaders from "../../utils/getHeaders";
import createContactValidation from "../../validation/createContactValidation";
import verifyTokens from "../../utils/verifyTokens";
import dbConnect from "../../config/dbConnect";
import UserModel, { UserSchema } from "@/server/models/UserModel";
import ConversationModel, {
  Conversation,
  ConversationSchema,
} from "@/server/models/ConversationModel";
import mongoose, { Document } from "mongoose";

export default async function addContact(req: NextRequest) {
  // Getting headers
  let headers: Headers;
  try {
    headers = getHeaders(req.headers);
  } catch (err: any) {
    return res.json({ message: err.message }, { status: 401 });
  }

  //   Get body
  let body;
  try {
    body = await req.json().then((resolve) => resolve);
  } catch (err) {
    return res.json(
      { message: "لطفا ایمیل و نام را به درستی وارد نمایید!" },
      { status: 400 }
    );
  }

  //   Validating the body
  const validatedBody = createContactValidation.safeParse(body);
  if (!validatedBody.success) {
    return res.json({
      message: validatedBody.error.errors[0].message,
      error: validatedBody.error,
    });
  }

  //   Verifying tokens
  const tokenData = await verifyTokens(headers);
  if (tokenData.error) {
    return res.json(
      {
        message: tokenData.error,
      },
      { status: 401 }
    );
  }

  const { email, newHeaders } = tokenData;

  try {
    await dbConnect();
  } catch (err) {
    return res.json(
      {
        message: "مشکلی در اتصال به پایگاه داده پیش آمد!",
        error: err,
      },
      { status: 500 }
    );
  }

  //   Check the existing of user in database
  const findUser = await UserModel.findOne<UserSchema>({ email });

  if (!findUser) {
    return res.json({ message: "کاربر مورد نظر یافت نشد!" }, { status: 404 });
  }

  const contactExists = findUser.contacts?.find(
    (contact) => contact.email === validatedBody.data.email
  );

  if (contactExists) {
    return res.json(
      { message: "این مخاطب در حال حاضر موجود است!" },
      { headers: newHeaders, status: 400 }
    );
  }

  const userExistToAdd = await UserModel.findOne<UserSchema>({
    email: validatedBody.data.email,
  });

  if (!userExistToAdd) {
    return res.json(
      { message: "چنین کاربری وجود خارجی ندارد!" },
      { status: 404, headers: newHeaders }
    );
  }

  //   Push the new contact if already not exist
  findUser.contacts?.push({
    email: validatedBody.data.email,
    name: validatedBody.data.name,
    avatar: userExistToAdd.avatar || null,
  });

  //   Save the data
  const result = await findUser.save();

  //   Send response
  return res.json(
    {
      message: "مخاطب با موفقیت ساخته شد",
      contact: result.contacts.find(
        (contact) => contact.email === validatedBody.data.email
      ),
    },
    { status: 201, headers: newHeaders }
  );
}

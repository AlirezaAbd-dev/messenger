import { NextRequest, NextResponse as res } from "next/server";

import dbConnect from "@/server/config/dbConnect";
import createContactValidation from "@/server/validation/createContactValidation";
import verifyTokens from "@/server/utils/verifyTokens";
import UserModel, { UserSchema } from "@/server/models/UserModel";
import getHeaders from "../../../server/utils/getHeaders";

export const POST = async (req: NextRequest) => {
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
    return res.json({
      message: tokenData.error,
    });
  }

  const { email, newToken } = tokenData;

  try {
    await dbConnect();
  } catch (err) {
    return res.json({
      message: "مشکلی در اتصال به پایگاه داده پیش آمد!",
      error: err,
    });
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
    return res.json({ message: "این مخاطب در حال حاضر موجود است!" });
  }

  //   Push the new contact if already not exist
  findUser.contacts?.push({
    email: validatedBody.data.email,
    name: validatedBody.data.name,
  });

  //   Save the data
  const result = await findUser.save();

  const newHeaders = new Headers({ "x-auth-token": "" });
  newHeaders.set("x-auth-token", newToken ? newToken : "");
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
};

import dbConnect from "@/server/config/dbConnect";
import UserModel, { UserSchema } from "@/server/models/UserModel";
import getHeaders from "@/server/utils/getHeaders";
import verifyTokens from "@/server/utils/verifyTokens";
import editContactValidation from "@/server/validation/editContactValidation";
import { NextRequest, NextResponse as res } from "next/server";

export { default as DELETE } from "@/server/controller/contact/deleteContact";

export default async function PUT(
  req: NextRequest,
  params: {
    slug: {
      contactId: string;
    };
  }
) {
  const contactId = params.slug.contactId;

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
  const validatedBody = editContactValidation.safeParse(body);
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

  const { email, newToken } = tokenData;

  const newHeaders = new Headers({ "x-auth-token": "" });
  newHeaders.set("x-auth-token", newToken ? newToken : "");

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

  const contactIndex = findUser.contacts.findIndex(
    (c) => c._id?.toString() === contactId.toString()
  );

  findUser.contacts[contactIndex].name = validatedBody.data.name;

  await findUser.save();

  res.json("مخاطب با موفقیت ویرایش شد", { headers: newHeaders });
}

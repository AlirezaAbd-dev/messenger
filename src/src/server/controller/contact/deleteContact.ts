import dbConnect from "@/server/config/dbConnect";
import UserModel, { UserSchema } from "@/server/models/UserModel";
import getHeaders from "@/server/utils/getHeaders";
import verifyTokens from "@/server/utils/verifyTokens";
import { NextRequest, NextResponse as res } from "next/server";

export default async function deleteContact(
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

  findUser.contacts.filter((c) => c._id?.toString() !== contactId.toString());

  res.json({ message: "مخاطب با موفقیت حذف شد!" }, { headers: newHeaders });
}

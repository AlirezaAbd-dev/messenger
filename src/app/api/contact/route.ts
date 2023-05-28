import { NextRequest, NextResponse as res } from "next/server";

import getHeaders from "@/server/utils/getHeaders";
import verifyTokens from "@/server/utils/verifyTokens";
import dbConnect from "@/server/config/dbConnect";
import UserModel, { UserSchema } from "@/server/models/UserModel";

export const GET = async (req: NextRequest) => {
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

  const contacts = findUser.contacts;

  return res.json(contacts, { headers: newHeaders });
};

export { default as POST } from "../../../server/controller/addContact";

import { NextRequest, NextResponse as res } from "next/server";

import cache from "@/server/config/nodeCache";
import { signInValidator } from "@/server/validation/signInValidation";
import createToken from "../utils/createToken";
import dbConnect from "../config/dbConnect";
import UserModel from "../models/UserModel";

export const PUT = async (req: NextRequest) => {
  let email: string;
  let OTP: number;
  try {
    [email, OTP] = await req?.json().then((res) => [res.email, res.OTP]);
  } catch (err) {
    return res.json(
      { message: "مشکلی در سرور پیش آمد!", error: err },
      { status: 500 }
    );
  }

  const validatedData = signInValidator.safeParse({ email, OTP });

  if (!validatedData.success) {
    return res.json(
      {
        error: validatedData.error.errors,
      },
      { status: 400 }
    );
  }

  let cachedData;
  cachedData = <string | undefined>await cache.get(email);
  console.log(cachedData);
  if (!cachedData) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  if (OTP !== Number(cachedData)) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  try {
    cache.del(email);
  } catch (err) {
    return res.json({ message: "مشکلی در سرور پیش آمد!" }, { status: 500 });
  }

  try {
    await dbConnect();

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      const { verifyToken, refreshToken } = await createToken(findUser.email);

      return res.json(
        { message: "با موفقیت وارد حساب خود شدید" },
        {
          status: 200,
          headers: {
            "x-auth-token": verifyToken,
            "x-refresh-token": refreshToken,
          },
        }
      );
    }
  } catch (err: any) {
    return res.json({ message: err.message, error: err }, { status: 500 });
  }

  try {
    const createdUser = new UserModel({ email, name: "" });

    const { verifyToken, refreshToken } = await createToken(createdUser.email);

    return res.json(
      { message: "با موفقیت وارد حساب خود شدید" },
      {
        status: 201,
        headers: {
          "x-auth-token": verifyToken,
          "x-refresh-token": refreshToken,
        },
      }
    );
  } catch (err: any) {
    return res.json({ message: err.message, error: err }, { status: 500 });
  }
};

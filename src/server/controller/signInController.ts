import { NextRequest, NextResponse as res } from "next/server";

import cache from "@/server/config/nodeCache";
import { signInValidator } from "@/server/validation/signInValidation";
import prismaClient from "@/server/config/prismaClient";
import createToken from "../utils/createToken";

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
  try {
    cachedData = <string | undefined>await cache.take(email);
  } catch (err) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  if (!cachedData) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  if (+OTP !== +cachedData) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  try {
    const findUser = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (findUser) {
      const { verifyToken, refreshToken } = await createToken(findUser.email);

      return res.json(
        { message: "با موفقیت وارد حساب خود شدید" },
        {
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
    const createdUser = await prismaClient.user.create({
      data: {
        email,
        name: "",
      },
    });

    const { verifyToken, refreshToken } = await createToken(createdUser.email);

    return res.json(
      { message: "با موفقیت وارد حساب خود شدید" },
      {
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

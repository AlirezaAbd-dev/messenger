import { NextRequest, NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";

import cache from "@/config/nodeCache";
import { signInValidator } from "@/server/validation/signInValidation";
import prismaClient from "@/config/prismaClient";

export const PUT = async (req: NextRequest) => {
  let email: string;
  let OTP: number;
  try {
    [email, OTP] = await req?.json().then((res) => [res.email, res.OTP]);
  } catch (err) {
    return res.json({ message: "مشکلی در سرور پیش آمد!", error: err });
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

  const cachedData = <string | undefined>await cache.take(email);

  if (!cachedData) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  if (+OTP !== +cachedData) {
    return res.json({ message: "رمز یکبار مصرف اشتباه است!" }, { status: 400 });
  }

  prismaClient.user
    .create({
      data: {
        email,
        name: "",
      },
    })
    .then((resolve) => {
      const verifyToken = jwt.sign(
        { email: resolve.email },
        process.env.JWT_VERIFY_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { email: resolve.email },
        process.env.JWT_REFRESH_SECRET
      );

      return res.json(
        { message: "مخاطب با موفقیت ساخته شد" },
        {
          headers: {
            "x-auth-token": verifyToken,
            "x-refresh-token": refreshToken,
          },
        }
      );
    })
    .catch((err) => {
      return res.json({ message: err.message, error: err }, { status: 500 });
    });
};

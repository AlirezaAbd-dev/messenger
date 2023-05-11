import z from "zod";
import { NextRequest, NextResponse as res } from "next/server";

import cache from "@/config/nodeCache";
import transport from "@/config/mailTransport";

export const POST = async (req: NextRequest) => {
  let email;
  try {
    email = <string>await req?.json();
  } catch (err) {}

  const signInValidator = z
    .string({
      required_error: "لطفا ایمیل خود را وارد نمایید!",
      invalid_type_error: "لطفا یک رشته ی متنی ارسال نمایید!",
    })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" });

  // Validating the body
  const validatedEmail = signInValidator.safeParse(email);

  if (!validatedEmail.success) {
    return res.json(
      {
        message: validatedEmail.error.errors[0].message,
      },
      { status: 400 }
    );
  }
  // End of validating

  // Making a random number for sending to user
  const randomNumber = Math.floor(Math.random() * 1000000);

  // set the random number into cache
  cache.set(validatedEmail.data, randomNumber);

  // sending email to user
  transport.sendMail({
    from: process.env.NODEMAILER_USER,
    to: validatedEmail.data,
    subject: "کد یکبار مصرف پیامرسان",
    text: `کد یکبار مصرف: 
    ${randomNumber}
    لطفا این کد را در اختیار دیگران قرار ندهید.
    `,
  });

  // Response
  return res.json({ message: "ok" });
};

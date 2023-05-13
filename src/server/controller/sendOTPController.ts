import { NextRequest, NextResponse as res } from "next/server";

import cache from "@/server/config/nodeCache";
import transport from "@/server/config/mailTransport";
import { sendEmailValidator } from "@/server/validation/signInValidation";

export const POST = async (req: NextRequest) => {
  let email;
  try {
    email = <string>await req?.json().then((res) => res.email);
  } catch (err) {
    return res.json({ message: "مشکلی در سرور پیش آمد!", error: err });
  }

  // Validating the body
  const validatedEmail = sendEmailValidator.safeParse(email);

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
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  // set the random number into cache
  cache.set(validatedEmail.data, randomNumber);

  // sending email to user
  const emailResponse = await transport.sendMail({
    from: process.env.NODEMAILER_USER,
    to: validatedEmail.data,
    subject: "کد یکبار مصرف پیامرسان",
    text: `کد یکبار مصرف: 
      ${randomNumber}
      لطفا این کد را در اختیار دیگران قرار ندهید.
      `,
  });

  if (emailResponse.accepted) {
    return res.json({ message: "ایمیل با موفقیت ارسال شد" }, { status: 200 });
  }
};

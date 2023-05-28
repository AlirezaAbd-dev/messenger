import z from "zod";

export const sendEmailValidator = z
  .string({
    required_error: "لطفا ایمیل خود را وارد نمایید!",
    invalid_type_error: "لطفا یک رشته ی متنی ارسال نمایید!",
  })
  .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" });

export const signInValidator = z.object({
  email: z
    .string({
      required_error: "لطفا ایمیل خود را وارد نمایید!",
      invalid_type_error: "لطفا یک رشته ی متنی ارسال نمایید!",
    })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" }),
  OTP: z.number({ required_error: "فیلد کد یکبار مصرف را باید پر کنید!" }),
});

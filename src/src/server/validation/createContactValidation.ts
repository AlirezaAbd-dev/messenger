import z from "zod";

export default z.object({
  name: z.string({
    invalid_type_error: "لطفا نام مخاطب را به صورت رشته وارد نمایید!",
    required_error: "لطفا نام مخاطب را وارد نمایید!",
  }),
  email: z
    .string({
      invalid_type_error: "لطفا ایمیل مخاطب را به صورت رشته وارد نمایید!",
      required_error: "لطفا ایمیل مخاطب را وارد نمایید!",
    })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" }),
});

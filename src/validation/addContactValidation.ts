import z from "zod";

export default z.object({
  email: z
    .string({ required_error: "پر کردن فیلد ایمیل اجباری است!" })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" }),
  name: z
    .string({ required_error: "پر کردن فیلد نام مخاطب اجباری است!" })
    .min(3, { message: "نام مخاطب باید حداقل 3 حرف باشد!" }),
});

import { z } from "zod";

export default z.object({
  name: z.string({
    invalid_type_error: "لطفا نام را با فرمت درست وارد نمایید!",
    required_error: "وارد کردن نام مخاطب اجباری است!",
  }),
});

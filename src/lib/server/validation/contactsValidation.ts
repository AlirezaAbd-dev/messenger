import { z } from 'zod';

class contactValidation {
   static addContact = z.object({
      name: z.string({
         invalid_type_error: 'لطفا نام مخاطب را به صورت رشته وارد نمایید!',
         required_error: 'لطفا نام مخاطب را وارد نمایید!',
      }),
      email: z
         .string({
            invalid_type_error: 'لطفا ایمیل مخاطب را به صورت رشته وارد نمایید!',
            required_error: 'لطفا ایمیل مخاطب را وارد نمایید!',
         })
         .email({ message: 'لطفا از یک ایمیل معتبر استفاده نمایید!' }),
   });

   static editContact = z.object({
      id: z.string({
         invalid_type_error: 'لطفا ایدی را با فرمت درست وارد نمایید!',
         required_error: 'وارد کردن آیدی مخاطب اجباری است!',
      }),
      name: z.string({
         invalid_type_error: 'لطفا نام را با فرمت درست وارد نمایید!',
         required_error: 'وارد کردن نام مخاطب اجباری است!',
      }),
   });

   static deleteContact = z.object({
      id: z.string({
         invalid_type_error: 'لطفا ایدی را با فرمت درست وارد نمایید!',
         required_error: 'وارد کردن آیدی مخاطب اجباری است!',
      }),
   });
}
export default contactValidation;

import { Field, ErrorMessage } from 'formik';

import Icons from '../ui/Icons';

const ModalInputs = () => {
   return (
      <div className='mt-4 flex flex-col items-center gap-4'>
         <div className='flex h-10 w-[80%] overflow-hidden rounded-xl bg-yellow-500 text-xs md:text-base'>
            <div className='flex aspect-square h-full items-center justify-center bg-yellow-600'>
               {/* User SVG solid */}
               <Icons.UserSvgSolid />
            </div>
            <Field
               name='name'
               type='text'
               className='h-full w-full bg-transparent px-3 outline-none placeholder:text-gray-700'
               placeholder='نام مخاطب'
            />
         </div>
         <ErrorMessage
            name='name'
            render={(msg: string) => <p className='text-red-500'>{msg}</p>}
         />
         <div className='flex h-10 w-[80%] overflow-hidden rounded-xl bg-yellow-500 text-xs md:text-base'>
            <div className='flex aspect-square h-full items-center justify-center bg-yellow-600'>
               {/* User SVG solid */}
               <Icons.MailIconSvg />
            </div>
            <Field
               name='email'
               type='email'
               className='h-full w-full bg-transparent px-3 outline-none placeholder:text-gray-700'
               placeholder='ایمیل'
            />
         </div>
         <ErrorMessage
            name='email'
            render={(msg: string) => <p className='text-red-500'>{msg}</p>}
         />
      </div>
   );
};

export default ModalInputs;

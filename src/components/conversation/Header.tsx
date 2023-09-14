import Image from 'next/image';
import { MoreVertical } from 'lucide-react';

import Avatar from '../../assets/images/vecteezy_abstract-black-gradient-geometric-shape-background_6644317.jpg';
// import Icons from "../ui/Icons";

type HeaderProps = {
   name?: string;
   lastSeen?: Date;
   avatar?: string;
};

const Header = (props: HeaderProps) => {
   return (
      <header className='flex h-14 w-full items-center justify-between py-2 shadow-xl'>
         {/* Avatar And Name */}
         <div className='flex flex-grow cursor-pointer hover:bg-zinc-900'>
            <Image
               src={props.avatar || Avatar.src}
               alt='Avatar'
               width={100}
               height={100}
               className='mx-2 h-11 w-11 rounded-full'
            />
            <div>
               <h3>{props.name}</h3>
               <p className='text-xs text-gray-400'>
                  آخرین بازدید {props.lastSeen?.toString()}
               </p>
            </div>
         </div>
         {/* Options */}
         <div className='mx-2 flex'>
            <MoreVertical className='cursor-pointer p-1 w-8 h-8 rounded-full hover:bg-yellow-500 hover:text-black' />
            {/* <Icons.OptionsIconSvg /> */}
         </div>
      </header>
   );
};

export default Header;

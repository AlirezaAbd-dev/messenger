import MainSidebar from '@/components/sidebar/MainSidebar';
import NavbarLayout from '@/layouts/NavbarLayout';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/modal/Modal'));

const layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <main className='flex h-screen min-h-[600px] w-full flex-col bg-zinc-800 text-white'>
         {/* Main Navbar */}
         <NavbarLayout />

         <Modal />

         <div className='grid h-full grid-cols-1 grid-rows-1 pb-24 md:grid-cols-4 md:pb-10'>
            {/* Sidebar */}
            <MainSidebar />

            {children}
         </div>
      </main>
   );
};

export default layout;

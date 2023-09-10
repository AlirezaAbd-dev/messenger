import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import '@/env';
import './globals.css';
import type { Metadata } from 'next';
import TrpcProvider from '@/lib/trpc/Provider';

const myFont = localFont({
   src: '../assets/fonts/BYekan.woff2',
   display: 'swap',
   variable: '--var-yekan-font',
});

export const metadata = {
   title: 'Messenger',
   description: 'Generated By Alireza Abedi',
} satisfies Metadata;

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='fa'>
         <body
            dir='rtl'
            className={`${myFont.variable} overflow-hidden bg-zinc-800`}
         >
            <TrpcProvider>
               <TrpcProvider>
                  <Toaster
                     position='top-center'
                     reverseOrder={false}
                     toastOptions={{
                        style: {
                           borderRadius: '17px',
                           background: '#333',
                           color: '#fff',
                        },
                     }}
                  />
                  {children}
               </TrpcProvider>
            </TrpcProvider>
         </body>
      </html>
   );
}

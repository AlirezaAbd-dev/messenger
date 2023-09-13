import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuthorization = () => {
   const router = useRouter();

   useEffect(() => {
      if (
         localStorage.getItem('verify-token') == null ||
         localStorage.getItem('refresh-token') == null ||
         localStorage.getItem('verify-token') == 'undefined' ||
         localStorage.getItem('refresh-token') == 'undefined'
      ) {
         return router.replace('/signIn');
      }
   }, [router]);
};

export default useAuthorization;

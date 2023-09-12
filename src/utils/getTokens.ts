export default function getTokens() {
   const verifyToken = localStorage.getItem('verify-token');
   const refreshToken = localStorage.getItem('refresh-token');

   return { verifyToken, refreshToken } as {
      verifyToken: string;
      refreshToken: string;
   };
}

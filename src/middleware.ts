import { NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest) => {
   const url = new URL(req.url);

   if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/home', req.url));
   }

   if (
      url.pathname.startsWith('/api') &&
      !url.pathname.startsWith('/api/signIn')
   ) {
      // I just placed it for future uses
   }
};

export const config = {
   matcher: ['/', '/api/:path*'],
};

export default middleware;

import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  return NextResponse.redirect(new URL("/chat", req.url));
};

export const config = {
  matcher: "/",
};

export default middleware;

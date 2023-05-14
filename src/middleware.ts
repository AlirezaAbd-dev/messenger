import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const url = new URL(req.url);
  console.log(url.pathname);

  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (
    url.pathname.startsWith("/api") &&
    !url.pathname.startsWith("/api/signIn")
  ) {
    const headers = new Headers(req.headers);
    console.log(headers);
  }
};

export default middleware;

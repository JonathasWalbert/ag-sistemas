import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("userLogged");


  if (!userCookie && req.nextUrl.pathname.startsWith("/area-membro")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  if (userCookie && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/area-membro", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/area-membro/:path*"],
};

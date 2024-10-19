import { NextRequest, NextResponse } from "next/server";
import { isAutehnticated } from "./utils/auth/auth_service";
import { getToken } from "./utils/auth/auth_repository";

export function middleware(request: NextRequest) {
  const baseUrl: string = process.env.BASE_URL ?? "http://localhost:3000";
  if (isAutehnticated()) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(baseUrl);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(baseUrl + "/login");
  }
}

export const config = {
  matcher: [
    // 除外したいパスを正規表現で指定
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

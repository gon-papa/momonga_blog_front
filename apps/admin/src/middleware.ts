import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./utils/auth/auth_service";

export function middleware(request: NextRequest) {
  const baseUrl: string = process.env.BASE_URL ?? "http://localhost:3000";
  const currentPath = request.nextUrl.pathname;

  if (isAuthenticated()) {
    if (currentPath === "/login") {
      return NextResponse.redirect(baseUrl);
    }
    return NextResponse.next();
  }

  if (currentPath !== "/login") {
    return NextResponse.redirect(`${baseUrl}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 除外したいパスを正規表現で指定
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

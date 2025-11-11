import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token");
    const { pathname } = req.nextUrl;

    const isPublic = ["/user/login", "/user/register"].includes(pathname);

    if (!isPublic && !token) {
        const loginUrl = new URL("/user/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isPublic && token) {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico|static).*)"],
};

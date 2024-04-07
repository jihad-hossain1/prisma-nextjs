import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getUserPath } from "./helpers/getUserPaths";

export default withAuth(
  async function middleware(req) {
    const { nextUrl } = req;
    const id = req.nextauth.token.id;
    const user = (await getUserPath(id)) as { path: string[]; role: string };

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token.role != "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    } else if (!user || !user.path.includes(nextUrl.pathname)) {
      return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*", "/affiliate/:path*"] };

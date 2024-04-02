import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getUser } from "./utils/fetchUsers";

export default withAuth(

  async function middleware(req) {
    // console.log('user info from db: ', req.nextauth.token.id);

    const id = req.nextauth.token.id;

    const user = await getUser(id);


    console.log('response from middleware', user.menue);

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };

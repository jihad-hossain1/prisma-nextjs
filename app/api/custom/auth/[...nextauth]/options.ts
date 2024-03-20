import { NextRequest } from "next/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

enum XRole {
  Admin = "ADMIN",
  SuperAdmin = "SUPERADMIN",
}

declare module "next-auth" {
  interface User {
    xrole: XRole;
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    xuser: {
      id: string;
      xrole: XRole;
      mobile: string;
      name: string;
      password: string;
      // Include other properties as needed
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    xrole?: XRole;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "CustomCredentials",
      credentials: {
        mobile: {
          label: "mobile:",
          type: "mobile",
          placeholder: "your-mobile",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },

      async authorize(
        credentials: { mobile: string; password: string },
        req: NextRequest
      ) {
        const { mobile, password } = credentials;
        console.log(credentials);

        try {
          const foundUser = await prisma.admin.findFirst({
            where: { mobile },
          });
          console.log(foundUser);
          const xuser = {
            id: foundUser?.id,
            mobile: foundUser?.mobile,
            name: foundUser.name,
            xrole: foundUser?.role,
          };
          if (foundUser) {
            // console.log("User Exists");
            await bcrypt.compare(password, foundUser.password);
            delete foundUser.password;

            return Promise.resolve(xuser);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login/admin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Use a type guard to check if the 'role' property exists on 'user'
        const role = "xrole" in user ? user.xrole : "defaultRole";
        token.role = role;
        token.id = user?.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        // Ensure 'role' is of type 'Role' by casting it
        const role =
          "xrole" in token ? (token.xrole as XRole) : ("defaultRole" as XRole);
        session.xuser.xrole = role;
        session.xuser.id = token?.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }): Promise<string> {
      const nextAuthBaseUrl = process.env.NEXTAUTH_URL_INTERNAL || baseUrl;
      console.log(url, nextAuthBaseUrl);
      return nextAuthBaseUrl;
    },
  },
};

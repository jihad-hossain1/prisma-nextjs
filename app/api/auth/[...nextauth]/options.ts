import { NextRequest } from "next/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

enum Role {
  Admin = "ADMIN",
  User = "USER",
  // Add other roles as needed
}

declare module "next-auth" {
  interface User {
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      email: string;
      name: string;
      password: string;
      // Include other properties as needed
    };
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },

      async authorize(
        credentials: { email: string; password: string },
        req: NextRequest
      ) {
        const { email, password } = credentials;

        try {
          const foundUser = await prisma.user.findFirst({
            where: { email },
          });
          const user = {
            id: foundUser?.id,
            email: foundUser?.email,
            name: foundUser.name,
            role: foundUser?.role,
          };
          if (foundUser) {
            // console.log("User Exists");
            await bcrypt.compare(password, foundUser.password);
            delete foundUser.password;

            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Use a type guard to check if the 'role' property exists on 'user'
        const role = "role" in user ? user.role : "defaultRole";
        token.role = role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        // Ensure 'role' is of type 'Role' by casting it
        const role =
          "role" in token ? (token.role as Role) : ("defaultRole" as Role);
        session.user.role = role;
        session.user.id = token?.sub;
      }
      return session;
    },
  },
};

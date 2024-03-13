import { NextRequest } from "next/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";
import { use } from "react";

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
      // console.log("user from jwt", user);
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      // console.log("token from sesson", token);
      if (session?.user) session.user.role = token.role;
      if (session?.user) session.user.id = token.sub;
      return session;
    },
  },
};

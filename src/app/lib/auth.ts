import prisma from "../../../prisma/client";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "John Smith",
        },
      },
      async authorize(credentials) {
        // check to see if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // check to see if user exists
        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!user || !user?.password_hash) {
          throw new Error("No user found");
        }

        // check to see if password matches
        // const passwordMatch = await bcrypt.compare(
        //   credentials.password,
        //   user.password_hash,
        // );

        const passwordMatch = credentials.password == user.password_hash;
        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.user_id,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.SECRET || undefined, // Set it to undefined if not provided
  session: {
    strategy: "jwt", // Update this based on your desired session strategy
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);

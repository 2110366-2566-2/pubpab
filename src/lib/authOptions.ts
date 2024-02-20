import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/client";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // Update this based on your desired session strategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        // username: {
        //   label: "Username",
        //   type: "text",
        //   placeholder: "John Smith",
        // },
      },
      async authorize(credentials) {
        // check to see if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // check to see if user exists
        const tmpuser = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!tmpuser || !tmpuser?.password_hash) {
          throw new Error("No user found");
        }

        // check to see if password matches
        // const passwordMatch = await bcrypt.compare(
        //   credentials.password,
        //   user.password_hash,
        // );
        const passwordMatch = await compare(
          credentials.password,
          tmpuser.password_hash,
        );
        // no bcrypt
        // const passwordMatch = credentials.password == user.password_hash;

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        const user = {
          id: tmpuser.user_id,
          email: tmpuser.email,
          role: tmpuser.user_type,
          name: tmpuser.first_name,
        };
        return user;
      },
    }),
  ],
  // secret: process.env.SECRET || undefined, // Set it to undefined if not provided

  // debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      // If - if you have multiple providers, because they return different user objects
      // and you need to check for undefined because sometimes jwt runs multiple times in a row, and in the second one the user data gets lost, or will overwrite what you have with undefined
      if (user) {
        token.role = user.role;
        token.id = user.id;
        // token.name = user.kuay;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        // session.user.name = token.name;
      }
      return session;
    },
  },
};

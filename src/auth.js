// src/auth.j
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInService } from "./services/auth/signInServices";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          const user = await signInService(credentials);

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }
          if (!user) {
            throw new Error("Invalid credentials");
          }

          // console.log(user);
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token; // Ensure token is always returned
    },
    session: async ({ session, token }) => {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});

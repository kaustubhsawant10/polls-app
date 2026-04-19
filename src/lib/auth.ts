// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { WHITELIST } from "./whitelist";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ profile }) {
//       const email = profile?.email;

//       if (!email || !WHITELIST.some((e) => e.email === email)) {
//         return false; // redirect if not allowed
//       }

//       return true;
//     },

//     async session({ session, token }) {
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//     error: "/unauthorized",
//   },
// });

import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { WHITELIST } from "./whitelist";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const isAllowed =
        !!user.email && WHITELIST.some((e) => e.email === user.email);

      if (!isAllowed) {
        // Returning false triggers a redirect to the error page defined below
        return false;
      }

      return true;
    },

    async session({ session }) {
      const email = session.user?.email;

      const isAllowed = !!email && WHITELIST.some((e) => e.email === email);

      // attach flag to session
      (session.user as any).isAllowed = isAllowed;

      if (!isAllowed) {
        return {} as any;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
};

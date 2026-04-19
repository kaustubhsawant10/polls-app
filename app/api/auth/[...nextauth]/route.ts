// import { handlers } from "@/src/lib/auth";

// export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import { authConfig } from "@/src/lib/auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const GET = handlers.GET;
export const POST = handlers.POST;

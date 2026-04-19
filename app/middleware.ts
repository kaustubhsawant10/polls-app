// import { auth } from "@/src/lib/auth";
// import { NextResponse } from "next/server";

// export default auth((req: any) => {
//   const isLoggedIn = !!req.auth;

//   const protectedRoutes = ["/api/poll"];
//   console.log("isLoggedIn:", isLoggedIn);
//   console.log("req:", req);
//   console.log("protectedRoutes:", protectedRoutes);
//   if (!isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// });

// export const config = {
//   matcher: ["/api/poll"],
// };

// import { auth } from "@/app/api/auth/[...nextauth]/route";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;

//   const isProtectedRoute = req.nextUrl.pathname.startsWith("/api/poll");

//   if (isProtectedRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/api/:path*"],
// };

import { auth, signIn } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export default auth(async (req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const session = req.auth;
  const isLoggedIn = !!session;

  /**
   * 1. Define protected routes (your route group: /app/(protected))
   */
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/poll");

  /**
   * 2. Public routes (must ALWAYS bypass middleware)
   */
  const isPublicRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/unauthorized") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico";

  if (isPublicRoute) {
    return NextResponse.next();
  }

  /**
   * 3. Block unauthenticated access to protected routes
   */
  if (isProtectedRoute && !isLoggedIn) {
    toast("Please sign in to continue", { icon: "🔒" });
    await signIn("google", {
      callbackUrl: "/",
    });
    return;
    // return NextResponse.redirect(new URL("/login", nextUrl));
  }

  /**
   * 4. Optional: block unauthorized users (whitelist / roles)
   *    (only if you set session.user.isAllowed in NextAuth callback)
   */
  const isAllowed = (session?.user as any)?.isAllowed;

  if (isLoggedIn && isAllowed === false) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // run middleware on everything except static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

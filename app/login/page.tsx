"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={async () => {
          // "use server";
          await signIn("google", {
            callbackUrl: "/",
          });
        }}
        className="px-6 py-3 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}

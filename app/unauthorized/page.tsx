"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function UnauthorizedPage() {
  useEffect(() => {
    toast.error("Unauthorized email. Access denied.", {
      duration: 3000,
    });

    setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-between">
        <h4 className="text-base sm:text-lg md:text-lg font-medium text-gray-800 mb-5">
          Unauthorized login. You will be logged out automatically.
        </h4>
      </div>
    </div>
  );
}

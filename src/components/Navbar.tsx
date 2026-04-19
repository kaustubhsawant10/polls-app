"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  // Prevent flicker / unauthorized access attempt handling
  useEffect(() => {
    if (status === "unauthenticated") {
      // optional: cleanup UI state
      setIsOpen(false);
    }
  }, [status]);

  /**
   * Sign out flow
   */
  // const handleSignOut = async () => {
  //   toast.success("Signing out...", { duration: 2000 });

  //   await signOut({
  //     callbackUrl: "/login",
  //   });
  // };
  const handleSignOut = async () => {
    console.log("data: ", session);

    // 1. Show the toast
    toast.success("Signing out...", { duration: 1500 });

    // 2. Run signOut without the automatic page reload
    await signOut({ redirect: false });

    // 3. Wait for the toast duration (1.5s)
    setTimeout(() => {
      window.location.href = "/login"; // or use router.push("/login")
    }, 1500);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white px-6 py-4 z-50 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading group bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 rounded-sm">
            <span className="px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft group-hover:bg-transparent leading-5">
              CricPolls
            </span>
          </button>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/">
            <Button className="px-4 py-2 rounded-sm bg-white text-black hover:bg-gray-200 transition">
              Dashboard
            </Button>
          </Link>
          <Link href="/poll">
            <Button className="px-4 py-2 rounded-sm bg-white text-black hover:bg-gray-200 transition">
              Vote
            </Button>
          </Link>

          {/* Auth Button */}
          {!isAuthenticated ? (
            ""
          ) : (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-sm bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sign out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            {/* <Button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"> */}
            Dashboard
            {/* </Button> */}
          </Link>
          <Link
            href="/poll"
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
          >
            {/* <Button className="px-4 py-2 rounded-sm bg-white text-black hover:bg-gray-200 transition"> */}
            Vote
            {/* </Button> */}
          </Link>

          {/* Auth */}
          {!isAuthenticated ? (
            ""
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                handleSignOut();
              }}
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

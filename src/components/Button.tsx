"use client";

import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export default function Button({
  onClick,
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-sm border border-gray-300 hover:bg-gray-100 transition ${className}`}
    >
      {children}
    </button>
  );
}

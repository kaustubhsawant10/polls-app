import Button from "@/src/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-base sm:text-lg md:text-4xl font-medium text-gray-800 mb-5">
          Welcome to CricPolls
        </h2>
        <div className="flex items-center justify-between gap-5">
          <Link href="/">
            <Button>Dashboard</Button>
          </Link>
          <Link href="/poll">
            <Button>Vote</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Poll() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleReset = () => {
    setSelectedOption("");
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-4 sm:p-6 bg-white border border-gray-100 rounded-sm shadow-sm">
        {/* Question */}
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-800 mb-5">
          Which option do you prefer?
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {/* Option A */}
          <label className="block cursor-pointer">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="poll"
                  value="A"
                  checked={selectedOption === "A"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-4 h-4 accent-gray-600"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  Option A
                </span>
              </div>
            </div>
          </label>

          {/* Option B */}
          <label className="block cursor-pointer">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="poll"
                  value="B"
                  checked={selectedOption === "B"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-4 h-4 accent-gray-600"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  Option B
                </span>
              </div>
            </div>
          </label>
        </div>

        {/* Reset Button */}
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={() => router.back()}>Back</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

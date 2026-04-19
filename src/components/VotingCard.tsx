import { useRouter } from "next/navigation";
import { IplMatch } from "@/public/schedule";
import Image from "next/image";
import { ReactNode } from "react";

type VotingProps = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  match: IplMatch;
};

export default function VotingCard({
  onClick,
  children,
  className = "",
  match,
}: VotingProps) {
  const router = useRouter();
  // const [selectedOption, setSelectedOption] = useState("");

  const handleReset = () => {
    // setSelectedOption("");
  };

  const inputDate = new Date(match.endTime);
  const today = new Date();

  const isToday =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate();

  const isDisabled = new Date() > new Date(match.endTime) || !isToday;

  return (
    <div
      className={`w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-2 sm:p-4 bg-white border border-gray-100 rounded-sm shadow-sm ${isDisabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Question */}
      <div className="flex items-center justify-between mb-3 gap-5">
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
          {match.teams[0]} <span>{" vs "}</span> {match.teams[1]}
        </h2>
        <label className="flex items-center gap-2 sm:text-sm">
          <Image
            unoptimized
            src={`/icons/location_pin.png`}
            alt="location"
            width={15}
            height={15}
          />
          {match.venue}
        </label>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {match.teams.map((team) => (
          <label key={team} className="block mb-2 cursor-pointer">
            <div className="flex items-center justify-between px-2 py-1 border border-gray-200 rounded-sm hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <Image
                  unoptimized
                  src={`/icons/${team}.png`}
                  alt={team}
                  width={35}
                  height={35}
                />
                <input
                  type="radio"
                  name={`poll_${match.id}`}
                  value={team}
                  // checked={selectedOption === team}
                  // onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-4 h-4 accent-gray-600"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  {team}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Reset Button */}
      {/* <div className="mt-2 flex justify-end gap-2">
        <Button onClick={() => router.back()}>Back</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div> */}
    </div>
  );
}

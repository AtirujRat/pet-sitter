import Image from "next/image";
import star from "/public/assets/star-rating.svg";
import { useSitters } from "@/context/SittersProvider";

export default function RatingHome() {
  const rate = [1, 2, 3, 4, 5];
  const { setSelectedRating, selectedRating, setFilteredRating } = useSitters();

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {rate.reverse().map((num, index) => (
          <button
            key={index}
            id={num}
            role="checkbox"
            onClick={() => {
              setSelectedRating(num);
              setFilteredRating(num);
            }}
            className={`flex px-2 py-1 items-center justify-center gap-1 border  rounded-lg text-b2 ${
              selectedRating === num
                ? "border-ps-orange-500 text-ps-orange-500"
                : "border-ps-gray-200 text-ps-gray-400"
            } `}
          >
            {num}
            {Array.from({ length: num }).map((_, index) => (
              <Image src={star} alt="Star Rating" key={index} />
            ))}
          </button>
        ))}
      </div>
    </>
  );
}

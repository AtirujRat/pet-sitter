import { sittersContext } from "@/pages/sitters";
import { useContext } from "react";

export default function RatingSitter() {
  const rate = [1, 2, 3, 4, 5];
  const { setSelectedRating } = useContext(sittersContext);

  function selectRating(num) {
    setSelectedRating(num);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {rate.reverse().map((num, index) => (
        <button
          key={index}
          id={num}
          onClick={() => selectRating(num)}
          className="flex px-2 py-1 items-center justify-center gap-1 border border-[#DCDFED] focus:border-ps-orange-500 rounded-lg text-b2 text-ps-gray-400 focus:text-ps-orange-500"
        >
          {num}
          {Array.from({ length: num }).map((_, index) => (
            <img src="/assets/star-rating.svg" alt="Star Rating" key={index} />
          ))}
        </button>
      ))}
    </div>
  );
}

import Image from "next/image";
import star from "/public/assets/star-rating.svg";
import { useState } from "react";

export default function RatingFilter({ selectedRating, setSelectedRating }) {
  const rate = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        id="All reviews"
        onClick={() => setSelectedRating(null)}
        className={`flex px-2 py-1 items-center justify-center gap-1 border rounded-lg text-b2 ${
          selectedRating === null
            ? "border-ps-orange-500 text-ps-orange-500"
            : "border-ps-gray-200 text-ps-gray-400"
        } `}
      >
        All Reviews
      </button>
      {rate.reverse().map((num, index) => (
        <button
          key={index}
          id={num}
          onClick={() => setSelectedRating(num)}
          className={`flex px-2 py-1 items-center justify-center gap-1 border rounded-lg text-b2 ${
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
  );
}

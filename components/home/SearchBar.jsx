import RatingStars from "../rating/rating";
import Checkbox from "../checkbox/checkbox";
import { useState } from "react";

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState("0-2 Years");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="w-full max-w-[1064px]">
      {/* Checkbox */}
      <Checkbox />

      {/* Rating/Experience/Search */}
      <div className="bg-ps-white w-full h-[72px] flex p-6 items-center text-ps-gray-600 font-bold rounded-b-3xl drop-shadow-costom justify-between">
        <div className="flex items-center">
          <p className="pr-6">Rating:</p>
          <RatingStars />
        </div>

        <div className="flex items-center gap-3">
          <p>Experience:</p>
          <select
            value={selectedValue}
            onChange={handleChange}
            className="select select-bordered w-full max-w-xs outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
          >
            <option value="0-2 Years">0-2 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>
        </div>

        <button className="bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide w-[120px] h-[48px]">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

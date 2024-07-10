import Checkbox from "../checkbox/checkbox";
import Rating from "../rating/rating";
import { useState } from "react";

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState("0-2 Years");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="search-box bg-ps-white flex-1 w-full h-fit sm:rounded-2xl lg:shadow-lg sm:p-6 lg:sticky top-5">
      <div className="max-sm:hidden pb-10 flex flex-col">
        <label htmlFor="search" className="text-[16px] font-bold pb-1">
          Search
        </label>
        <input
          type="text"
          className="border-[#DCDFED] text-[#7B7E8F p-3 rounded-lg"
        />
      </div>
      <div className="flex-col sm:pb-10 pb-3 max-sm:bg-ps-gray-100 max-sm:px-5">
        <p className="sm:pb-4 text-[16px] font-bold">Pet Type:</p>
        <Checkbox />
      </div>
      <div className="sm:pb-10 pb-5 max-sm:px-5">
        <p className="sm:pb-4 max-sm:py-3 text-[16px] font-bold">Rating:</p>
        <RatingStars />
      </div>
      <div className="w-full flex flex-col gap-3 sm:pb-10 pb-6 max-sm:px-5">
        <p className="text-[16px] font-bold">Experience:</p>
        <select
          value={selectedValue}
          onChange={handleChange}
          className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
        >
          <option value="0-2 Years">0-2 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
      </div>
      <div className="flex gap-4 max-sm:pb-4 max-sm:px-5">
        <button className="max-sm:hidden w-full bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]">
          Clear
        </button>
        <button className="w-full bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

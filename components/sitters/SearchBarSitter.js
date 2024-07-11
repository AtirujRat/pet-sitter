import Checkbox from "../checkbox/checkbox";
import Rating from "../rating/rating";
import { useState } from "react";

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState("0-2 Years");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <div className="pb-10 flex flex-col">
        <label htmlFor="search" className="text-[16px] font-bold">
          Search
        </label>
        <input
          type="text"
          className="border-[#DCDFED] text-[#7B7E8F p-3 rounded-lg"
        />
      </div>
      <div className="flex-col pb-10">
        <p className="pb-4 text-[16px] font-bold">Pet Type:</p>
        <Checkbox />
      </div>
      <div className="pb-10">
        <p className="pb-4 text-[16px] font-bold">Rating:</p>
        <Rating />
      </div>
      <div className="w-full flex flex-col gap-3 pb-10">
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
      <div className="flex gap-4">
        <button className="w-full bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]">
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
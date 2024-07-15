import Rating from "../rating/rating";
import Checkbox from "../checkbox/checkbox";
import { useState } from "react";

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState("0-2 Years");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="w-full max-w-[1064px] px-4 py-4 lg:px-0">
      {/* Checkbox */}
      <div className="bg-ps-gray-100 md:px-6 px-4 w-full flex flex-col sm:flex-row sm:items-center sm:h-[72px] text-ps-gray-600 rounded-t-3xl">
        <div className="text-ps-gray-600 font-bold pt-4 pb-2 pr-3 sm:pt-0 sm:pb-0 w-[100px]">
          Pet Type:
        </div>
        <Checkbox />
      </div>

      {/* Rating/Experience/Search */}
      <div className="flex-col lg:flex-row gap-6 bg-ps-white w-full lg:h-[72px] flex lg:px-6 px-4 py-4 text-ps-gray-600 font-bold rounded-b-3xl drop-shadow-costom justify-between">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <p className="lg:pr-6 pb-3">Rating:</p>
          <Rating />
        </div>

        <div className="w-full lg:w-auto flex flex-col lg:flex-row lg:items-center lg:gap-3">
          <p className="pb-3 lg:pb-0">Experience:</p>
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

        <button className="w-full md:w-[80%] lg:w-[120px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px] self-center">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

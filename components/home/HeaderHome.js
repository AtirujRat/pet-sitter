import Image from "next/image";

import SearchBar from "@/components/home/SearchBar";
import elementhome1 from "../../public/assets/home/element-home-1.svg";
import elementhome2 from "../../public/assets/home/element-home-2.svg";

const HeaderHome = () => {
  return (
    <div>
      <header className="max-w-[1440px] mx-auto w-full md:flex flex-col items-center justify-center md:h-[441px] h-[565] gap-5 relative">
        <div>
          <p className="lg:text-[5.5rem] sm:text-[68px] text-[56px] lg:leading-[96px] md:leading-[62px] leading-[66px] font-[900] text-center text-shadow">
            Pet Sitter<span className="text-ps-orange-500">,</span>
            <br /> Perfect<span className="text-ps-blue-500">,</span>
            <br /> For Your Pet<span className="text-ps-yellow-200">.</span>
          </p>
          <p className="text-ps-gray-400 md:text-h3 text-h4 text-center pt-8 ">
            Find your perfect pet sitter with us.
          </p>
        </div>
        <div className="flex gap-4 mt-[50px] md:mt-0 relative h-[255px] md:h-auto overflow-hidden md:w-full md:justify-between md:absolute md:left-0 md:pt-0 pt-[50px] -z-10">
          <div className=" w-[255px] lg:w-[428px] aspect-square absolute right-[calc(50%+8px)] top-0 md:static">
            <Image
              src={elementhome1}
              alt="element-home-1"
              sizes="100%"
              width={428}
              className="object-cover"
            />
          </div>
          <div className="w-[255px] lg:w-[428px] aspect-square absolute left-[calc(50%+8px)] top-0 md:static">
            <Image
              src={elementhome2}
              alt="element-home-2"
              sizes="100%"
              width={428}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* SearchBar */}
      <div className="w-full lg:my-16 h-auto flex justify-center">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderHome;

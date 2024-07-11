import Image from "next/image";
import Link from "next/link";

import elementhome4 from "../../public/assets/home/element-home-4.svg";
import elementhome5 from "../../public/assets/home/element-home-5.svg";
import elementhome6 from "../../public/assets/home/element-home-6.svg";

const FindAPetSister = () => {
  return (
    <div>
      <div className="w-full max-w-[1440px] mx-auto md:p-20 -z-10">
        <div className="w-full h-[448px] bg-ps-yellow-100 rounded-2xl relative flex justify-center items-center">
          <div className="absolute md:bottom-0 md:left-0 -z-0 md:w-[337px] md:-translate-x-0 w-[248px] bottom-0 left-0 -translate-x-5">
            <Image
              src={elementhome4}
              alt="element-home"
              width={337}
              className="rounded-l-2xl"
            />
          </div>
          <div className="absolute -z-0 md:w-[327px] w-[200px] top-0 right-0 sm:flex hidden">
            <Image
              src={elementhome5}
              alt="element-home"
              width={327}
              className="rounded-2xl"
            />
          </div>
          <div className="absolute -z-0 w-[188px] top-0 right-0 sm:hidden">
            <Image
              src={elementhome6}
              alt="element-home"
              width={327}
              className="rounded-2xl"
            />
          </div>
          <div className="w-[457px] text-center z-10 md:p-0 p-4 md:pt-0 pt-16">
            <p className="md:text-h1 text-h2 pb-10">
              Perfect Pet Sitter For Your Pet
            </p>
            <span className="md:flex-row flex flex-col px-9 justify-between items-center w-full sm:h-[72px]">
              <Link href={"/register/sitter"}>
                <p className="w-full text-[16px] font-bold text-ps-orange-500 md:px-3 md:py-6 py-3 cursor-pointer hover:sm:bg-ps-orange-200 hover:sm:py-4 rounded-full">
                  Become A Pet Sitter
                </p>
              </Link>
              <Link href={"/sitters"}>
                <button className="min-w-[168px] w-full h-[48px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide">
                  Find A Pet Sitter
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAPetSister;

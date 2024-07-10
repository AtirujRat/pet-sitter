import Image from "next/image";
import sisterlogowhite from "../public/assets/sister-logo-white.svg";

const Footer = () => {
  return (
    <section className="w-full flex justify-center bg-ps-black md:h-[280px] text-ps-white">
      <div className="flex-col items-center text-center max-w-[1440px] min-w-0 w-full md:px-20 py-20 bg-ps-black">
        <div className="flex justify-center items-center bg-ps-black">
          <Image
            src={sisterlogowhite}
            alt="sister-logo-white"
            width={210}
            className="mb-6 w-[210px] bg-ps-black"
          />
        </div>
        <p className="sm:text-h3 sm:bg-ps-black text-ps-white text-b1">
          Find your perfect pet sitter with us.
        </p>
      </div>
    </section>
  );
};

export default Footer;

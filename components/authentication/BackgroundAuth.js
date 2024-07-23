import Image from "next/image";
import star from "@/public/assets/authentication/star.svg";
import paw from "@/public/assets/authentication/paw.svg";

export default function BackgroudAuth() {
  return (
    <>
      <Image
        src={star}
        alt="star"
        className="min-sm:w-[15%] max-lg:hidden absolute bottom-0 left-0"
      />
      <Image
        src={paw}
        alt="paw"
        className="w-[244px] max-lg:w-[23%] max-sm:w-[120px] absolute top-[10%] max-lg:top-[-55px] right-0 z-1"
      />
    </>
  );
}

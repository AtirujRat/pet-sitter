import Image from "next/image";
import star from "../../assets/authentication/star.svg";
import paw from "../../assets/authentication/paw.svg";

function BackgroudAuth() {
  return (
    <>
      <Image
        src={star}
        alt="star"
        className="w-[15%]  absolute bottom-0 left-0"
      />
      <Image src={paw} alt="paw" className="w-[15%] absolute top-0 right-0" />
    </>
  );
}

export default BackgroudAuth;

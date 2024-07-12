import Image from "next/image";
import message from "../../../public/assets/navbar/message.svg";

const NavBarSitter = ({ profileImage, fullName }) => {
  return (
    <div className="w-full relative">
      <div className="flex px-[60px] items-center justify-between  py-4">
        <div className="flex items-center gap-2">
          <Image
            src={profileImage}
            alt="profileImage"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-[16px]">{fullName}</p>
        </div>
        <div className="bg-ps-gray-200 rounded-full">
          <Image src={message} alt="profileImage" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default NavBarSitter;

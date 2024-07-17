import Image from "next/image";
import message from "../../../public/assets/navbar/message.svg";

const NavBarSitter = ({ profileImage, fullName }) => {
  return (
    <div className="w-full relative">
      <div className="flex px-[60px] items-center justify-between  py-4">
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden">
            <Image
              src={profileImage || ""}
              alt="profileImage"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
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

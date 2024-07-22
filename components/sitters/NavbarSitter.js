import Image from "next/image";
import message from "@/public/assets/navbar/message.svg";
import userImage from "@/public/assets/account/profile_white.svg";

export default function NavBarSitter({ profileImage, fullName }) {
  return (
    <div className="w-full relative">
      <div className="flex px-[60px] items-center justify-between  py-4">
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden flex justify-center items-center bg-ps-gray-200">
            {profileImage ? (
              <Image
                src={profileImage || ""}
                alt="profileImage"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Image
                src={userImage}
                alt="userImage"
                width={20}
                height={20}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <p className="text-[16px]">{fullName}</p>
        </div>
        <div className="bg-ps-gray-100 rounded-full">
          <Image src={message} alt="profileImage" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import message from "@/public/assets/navbar/message.svg";
import userImage from "@/public/assets/account/profile_white.svg";
import sitterlogo from "@/public/assets/sister-logo.svg";
import menu from "@/public/assets/navbar/menu.svg";
import logOut from "@/public/assets/icons/icon-logout-gray.svg";

export default function NavBarSitter({ profileImage, fullName }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) return;
    setOpenModal();
    router.push("/login/sitter");
  };

  return (
    <div className="w-full bg-ps-white">
      <div className="flex lg:px-[60px] sm:px-10 px-4 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#FAFAFB] lg:hidden flex w-[79px] md:w-[100px]">
            <Link href={"/"}>
              <Image src={sitterlogo} alt="sister-logo" width={131} />
            </Link>
          </div>
          <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden justify-center items-center bg-ps-gray-200 hidden lg:flex">
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
          <p className="text-[16px] hidden lg:flex">{fullName}</p>
        </div>
        <div className="flex gap-6">
          <div className="bg-ps-gray-100 rounded-full flex">
            <Image src={message} alt="profileImage" width={40} height={40} />
          </div>
          <Image
            src={menu}
            alt="menu"
            className="cursor-pointer lg:hidden flex"
            width={24}
            height={24}
            onClick={() => setOpenModal((prev) => !prev)}
          />
        </div>
      </div>

      {/* modal menu mobile size */}
      {openModal && (
        <div className="absolute top-15 right-0 size-10 bg-ps-white w-full h-full z-10">
          <div className="py-4 px-4 md:px-10 flex flex-col gap-4 bg-ps-gray-100">
            <div className="flex items-center gap-4 ">
              <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden justify-center items-center bg-ps-gray-200 ">
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
          </div>
          <div className="w-full px-6 py-6 text-b1 flex justify-end">
            <button
              className="flex items-center gap-3"
              onClick={() => {
                handleLogout();
              }}
            >
              <Image src={logOut} alt="logout" width={20} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

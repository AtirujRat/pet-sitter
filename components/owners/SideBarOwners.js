import React, { useState } from "react";
import Image from "next/image";
import profile_icon from "@/public/assets/account/profile_gray.svg";
import profile_icon_active from "@/public/assets/account/profile-active.svg";
import yourPet_icon from "@/public/assets/account/your-pet.svg";
import yourPet_icon_active from "@/public/assets/account/your-pet-active.svg";
import list_icon from "@/public/assets/account/list.svg";
import list_icon_active from "@/public/assets/account/list-active.svg";

function SideBarOwners() {
  const [accountState, setAccountState] = useState("profile");

  return (
    <div className="flex flex-col items-start w-full lg:w-[292px] lg:h-[356px] lg:rounded-2xl bg-ps-white shadow-md overflow-x-scroll lg:overflow-hidden">
      <h1 className="text-h4 hidden lg:block px-[20px] py-[20px]">Account</h1>
      <div className="text-b1 flex justify-between min-w-max lg:min-w-full lg:flex-col">
        <button
          onClick={() => setAccountState("profile")}
          className={`flex gap-5 ${
            accountState === "profile"
              ? "bg-ps-orange-100 text-ps-orange-500"
              : "text-ps-gray-500"
          }  py-[20px] px-[20px] hover:text-ps-orange-500 `}
        >
          <Image
            className="w-[25px] h-[24px] hover:text-ps-orange-500"
            src={
              accountState === "profile" ? profile_icon_active : profile_icon
            }
            alt="profile icon"
          />
          Profile
        </button>
        <button
          onClick={() => setAccountState("your-pet")}
          className={`flex gap-5 ${
            accountState === "your-pet"
              ? "bg-ps-orange-100 text-ps-orange-500"
              : "text-ps-gray-500 hover:text-ps-orange-500"
          }  py-[20px] px-[20px] `}
        >
          <Image
            className="w-[25px] h-[24px] hover:text-ps-orange-500"
            src={
              accountState === "your-pet" ? yourPet_icon_active : yourPet_icon
            }
            alt="your pet icon"
          />
          Your Pet
        </button>
        <button
          onClick={() => setAccountState("booking-history")}
          className={`flex gap-5 ${
            accountState === "booking-history"
              ? "bg-ps-orange-100 text-ps-orange-500"
              : "text-ps-gray-500"
          }  py-[20px] px-[20px] hover:text-ps-orange-500 `}
        >
          <Image
            className="w-[25px] h-[24px] hover:text-ps-orange-500"
            src={
              accountState === "booking-history" ? list_icon_active : list_icon
            }
            alt="booking history icon"
          />
          Booking History
        </button>
        <button
          onClick={() => setAccountState("change-password")}
          className={`flex gap-5 ${
            accountState === "change-password"
              ? "bg-ps-orange-100 text-ps-orange-500"
              : "text-ps-gray-500"
          }  py-[20px] px-[20px] hover:text-ps-orange-500 `}
        >
          <Image
            className="w-[25px] h-[24px] hover:text-ps-orange-500"
            src={
              accountState === "change-password" ? list_icon_active : list_icon
            }
            alt="change password icon"
          />
          Change Password
        </button>
      </div>
    </div>
  );
}

export default SideBarOwners;
import React, { useState } from "react";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import Image from "next/image";
import Profile from "./petowner/Profile";
import { useAdminPetOwner } from "@/context/AdminPetOwner";

export default function PetOwnerDetail(props) {
  const [currenDetails, setCurrentDetails] = useState("profile");

  const { currentOwner } = useAdminPetOwner();
  return (
    <section className="w-full flex flex-col gap-[90px] bg-ps-gray-100">
      <div className="flex items-center gap-[10px]">
        <Image
          className="w-[24px] h-[24px] rotate-180 cursor-pointer"
          src={arrow_icon}
          alt="arrow_icon"
          onClick={() => props.toggleOwnerDetailHandle()}
        />
        <p className="text-h3">{currentOwner?.full_name}</p>
      </div>

      <div className="relative bg-ps-white w-[1120px] h-[640px] rounded-r-lg rounded-b-lg">
        <div className="relative bottom-[60px] flex items-center gap-[20px]">
          <div
            className={` py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "profile"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Profile
          </div>
          <div
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "pets"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Pets
          </div>
          <div
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "reviews"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Reviews
          </div>
        </div>
        <div className="px-[40px]">
          {currenDetails === "profile" && <Profile />}
        </div>
      </div>
    </section>
  );
}

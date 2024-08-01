import React, { useState } from "react";
import Image from "next/image";
import Profile from "@/components/admin/petowner/Profile";
import Pets from "@/components/admin/petowner/Pets";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import { useAdminPetOwner } from "@/context/AdminPetOwner";
import Reviews from "@/components/admin/petowner/Reviews";

export default function PetOwnerDetail(props) {
  const [currenDetails, setCurrentDetails] = useState("profile");

  const { currentOwner, currentOwnerError } = useAdminPetOwner();
  return (
    <section className="w-full flex flex-col gap-[90px] bg-ps-gray-100">
      <div className="flex items-center gap-[10px]">
        <Image
          className="w-[24px] h-[24px] rotate-180 cursor-pointer"
          src={arrow_icon}
          alt="arrow_icon"
          onClick={() => props.closeModal()}
        />
        <p className="text-h3">{currentOwner?.full_name}</p>
      </div>

      <div className="relative bg-ps-white max-w-full h-[640px] rounded-r-lg rounded-b-lg">
        <div className="relative bottom-[60px] flex items-center gap-[20px]">
          <div
            onClick={() => setCurrentDetails("profile")}
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "profile"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Profile
          </div>
          <div
            onClick={() => setCurrentDetails("pets")}
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "pets"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Pets
          </div>
          <div
            onClick={() => setCurrentDetails("reviews")}
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
          {currentOwnerError ? (
            <p>{currentOwnerError}</p>
          ) : (
            <>
              {currenDetails === "profile" && <Profile />}
              {currenDetails === "pets" && <Pets />}
              {currenDetails === "reviews" && <Reviews />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

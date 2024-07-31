import React, { useState } from "react";
import Image from "next/image";
import { useAdminPetSitter } from "@/context/AdminPetSitter";

import ProfileSitter from "./ProfileSitter";
import Booking from "./Booking";
import Review from "./Review";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";

export default function PetOwnerDetail({ sitter, closeDetail }) {
  const [currenDetails, setCurrentDetails] = useState("profile");

  const { getStatusComponent } = useAdminPetSitter();

  return (
    <section className="w-full flex flex-col gap-[90px] bg-ps-gray-100">
      <div className="flex items-center gap-[10px] justify-between">
        <div className="flex items-center gap-6">
          <Image
            className="w-[24px] h-[24px] rotate-180 cursor-pointer"
            src={arrow_icon}
            alt="arrow_icon"
            onClick={closeDetail}
          />
          <p className="text-h3">{sitter?.full_name}</p>
          <div className="text-b2">
            {getStatusComponent(sitter?.sitter_status)}
          </div>
        </div>
        <div className="flex gap-2">
          {sitter.sitter_status === "Waiting for confirm" && (
            <>
              <ButtonOrangeLight id="Reject" text="Reject" width="w-fit" />
              <ButtonOrange id="Approve" text="Approve" width="w-fit" />
            </>
          )}
        </div>
      </div>

      <div className="relative bg-ps-white w-full min-h-[640px] rounded-r-lg rounded-b-lg">
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
            onClick={() => setCurrentDetails("Booking")}
            className={`py-[16px] px-[32px] text-h4 rounded-t-2xl ${
              currenDetails === "Booking"
                ? "bg-ps-white text-ps-orange-500"
                : "bg-ps-gray-200 text-ps-gray-400"
            } cursor-pointer`}
          >
            Booking
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
        <div className="px-10">
          {currenDetails === "profile" && <ProfileSitter sitter={sitter} />}
          {currenDetails === "Booking" && <Booking sitter={sitter} />}
          {currenDetails === "reviews" && <Review sitter={sitter} />}
        </div>
      </div>
    </section>
  );
}

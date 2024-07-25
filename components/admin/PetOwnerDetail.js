import React from "react";
import arrow_icon from "@/public/assets/icons/icon-next.svg";
import Image from "next/image";

export default function PetOwnerDetail(props) {
  return (
    <section className="w-full flex flex-col gap-[24px] p-10 pb-20 bg-ps-gray-100">
      <div className="flex items-center gap-[10px]">
        <Image
          className="w-[24px] h-[24px] rotate-180 cursor-pointer"
          src={arrow_icon}
          alt="arrow_icon"
          onClick={() => props.toggleOwnerDetailHandle()}
        />

        <p className="text-h3">Pet Owner</p>
      </div>
    </section>
  );
}

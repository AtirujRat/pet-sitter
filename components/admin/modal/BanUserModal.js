import React from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import axios from "axios";
import { useAdminPetOwner } from "@/context/AdminPetOwner";

export default function BanUserModal(props) {
  const { currentOwner } = useAdminPetOwner();

  async function banUserHandle() {
    await axios.put("/api/owner/updateowner", {
      id: currentOwner.id,
      member_status: props.action,
    });
    props.closeModal();
  }

  return (
    <div className="w-[400px] h-[208px] bg-ps-white rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[16px] px-[24px]">
        <h1 className="text-[20px] font-[700] text-ps-black">Ban User</h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex flex-col gap-[24px] p-[24px]">
        <p className="text-b2 text-ps-gray-400">
          Are you sure to ban this user?
        </p>
        <div className="flex justify-between">
          <ButtonOrangeLight onClick={() => props.closeModal()} text="Cancel" />

          <ButtonOrange
            onClick={() => banUserHandle()}
            text={
              currentOwner.member_status === "Baned" ? "Unban User" : "Ban User"
            }
          />
        </div>
      </div>
    </div>
  );
}

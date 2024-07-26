import React from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import axios from "axios";
import { useAdminPetOwner } from "@/context/AdminPetOwner";

function SuspendPetModal(props) {
  const { currentOwner, currentPet, togglePetDetailHandle, getCurrentOwner } =
    useAdminPetOwner();

  async function suspendPetHandle() {
    try {
      const deletePet = await axios.delete(
        `api/owner/${currentOwner.id}/pet/${currentPet.id}`
      );
      props.closeModal();
      togglePetDetailHandle();

      if (deletePet) {
        getCurrentOwner(currentOwner?.email);
      }
    } catch {
      alert("Can't suspend pet");
    }
  }

  return (
    <div className="w-[400px] h-[208px] bg-ps-white rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[16px] px-[24px]">
        <h1 className="text-[20px] font-[700] text-ps-black">Suspend Pet</h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex flex-col gap-[24px] p-[24px]">
        <p className="text-b2 text-ps-gray-400">
          Are you sure to suspend this pet?
        </p>
        <div className="flex justify-between">
          <ButtonOrangeLight onClick={() => props.closeModal()} text="Cancel" />
          <ButtonOrange
            onClick={() => suspendPetHandle()}
            text={"Suspend This Pet"}
          />
        </div>
      </div>
    </div>
  );
}

export default SuspendPetModal;

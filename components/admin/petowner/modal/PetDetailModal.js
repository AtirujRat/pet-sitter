import React, { useState } from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import { useAdminPetOwner } from "@/context/AdminPetOwner";
import Modal from "@/components/modal/Modal";
import SuspendPetModal from "@/components/admin/petowner/modal/SuspendPetModal";

export default function PetDetailModal(props) {
  const { currentPet } = useAdminPetOwner();

  const [isSuspendPetModalOpened, setIsSuspendPetModalOpened] = useState(false);

  function toggleSusPendPetHandle() {
    setIsSuspendPetModalOpened((prev) => !prev);
  }

  return (
    <div className="w-[800px] h-[608px] bg-ps-white rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[16px] px-[24px]">
        <h1 className="text-h3 text-ps-gray-600">{currentPet.name}</h1>
        {isSuspendPetModalOpened && (
          <Modal>
            <SuspendPetModal closeModal={toggleSusPendPetHandle} />
          </Modal>
        )}
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex flex-col gap-[24px] p-[40px]">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center gap-[16px] ">
            <img
              src={currentPet.pet_image_url}
              className="w-[240px] h-[240px] rounded-full object-cover"
              alt="pet image"
            />
            <p className="text-h4">{currentPet.name}</p>
          </div>
          <div className="flex flex-col gap-[40px] bg-ps-gray-100 w-[60%] rounded-lg p-[24px]">
            <div className="flex items-center justify-between">
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">Pet type</h1>
                <p className="text-[16px] font-[400]">{currentPet.type}</p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">Breed</h1>
                <p className="text-[16px] font-[400]">{currentPet.breed}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">Sex</h1>
                <p className="text-[16px] font-[400]">{currentPet.sex}</p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">Age</h1>
                <p className="text-[16px] font-[400]">{currentPet.age}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">Color</h1>
                <p className="text-[16px] font-[400]">{currentPet.color}</p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">Weight</h1>
                <p className="text-[16px] font-[400]">
                  {currentPet.weight} Kilogram
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[50%]">
                <h1 className="text-h4 text-ps-gray-300">About</h1>
                <p className="text-[16px] font-[400]">
                  {currentPet.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => toggleSusPendPetHandle()}
            className="text-ps-orange-500 text-[16px] font-[700]"
          >
            Suspend This Pet
          </button>
        </div>
      </div>
    </div>
  );
}

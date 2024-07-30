import { useAdminPetOwner } from "@/context/AdminPetOwner";
import {
  DogBadge,
  CatBadge,
  BirdBadge,
  RabbitBadge,
} from "@/components/sitters/PetBadges";
import React from "react";
import Modal from "@/components/modal/Modal";
import PetDetailModal from "@/components/admin/petowner/modal/PetDetailModal";

export default function Pets() {
  const { currentOwner, isPetsDetailModalOpened, togglePetDetailHandle } =
    useAdminPetOwner();

  const petTypeComponents = {
    dog: <DogBadge />,
    cat: <CatBadge />,
    bird: <BirdBadge />,
    rabbit: <RabbitBadge />,
  };

  return (
    <div className="flex gap-[16px] flex-wrap">
      {isPetsDetailModalOpened && (
        <Modal>
          <PetDetailModal closeModal={togglePetDetailHandle} />
        </Modal>
      )}
      {!currentOwner.pets[0] ? (
        <h1 className="text-h3">There is no pets.</h1>
      ) : (
        currentOwner.pets.map((pet, index) => {
          return (
            <div
              onClick={() => togglePetDetailHandle(pet)}
              key={index}
              className="flex justify-center flex-col items-center gap-[16px] w-[248px] h-[240px] border-[1px] border-ps-gray-200 rounded-2xl p-[24px] cursor-pointer"
            >
              <img
                className="w-[104px] h-[104px] rounded-full object-cover"
                src={pet.pet_image_url}
              />
              <h1 className="text-h4 text-ps-gray-600">{pet.name}</h1>
              {petTypeComponents[pet.type]}
            </div>
          );
        })
      )}
    </div>
  );
}

import Image from "next/image";
import test from "@/public/assets/booking/create/imgtest.svg";
import plus from "@/public/assets/booking/create/plus.svg";
import {
  DogBadge,
  CatBadge,
  BirdBadge,
  RabbitBadge,
} from "@/components/sitters/PetBadges";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useBooking } from "@/context/Booking";
import { useOwners } from "@/context/Owners";
import { useSitters } from "@/context/SittersProvider";

export default function YourPet() {
  const router = useRouter();
  const [selectedPets, setSelectedPets] = useState([]);
  const [select, setSelect] = useState({});
  const { userId, petData, setPetData } = useOwners();
  const { sittetId, setSitterId } = useSitters();
  const { setStepBooking } = useBooking();
  const id = router.query.id;

  const checkbox = Object.values(select).includes(true);
  const petTypeComponents = {
    dog: <DogBadge />,
    cat: <CatBadge />,
    bird: <BirdBadge />,
    rabbit: <RabbitBadge />,
  };

  const getData = async () => {
    if (!userId) {
      return;
    }

    try {
      const getDataOwners = await axios.post("/api/owner/booking", {
        id: userId,
      });
      const getDataSittets = await axios.get(`/api/sitters/${id}`);
      setSitterId(getDataSittets.data.data[0]);
      setPetData(getDataOwners.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  function handlePetSelect(event) {
    const { value, checked } = event.target;
    setSelectedPets((prevSelectedPets) => {
      let updatedSelectedPets;
      setSelect({ ...select, [value]: checked });
      if (checked) {
        updatedSelectedPets = [...prevSelectedPets, value];
      } else {
        updatedSelectedPets = prevSelectedPets.filter((pet) => pet !== value);
      }
      return updatedSelectedPets;
    });
  }
  if (sittetId.pet_types) {
    for (let i = 0; i < sittetId.pet_types.length; i++) {
      sittetId.pet_types[i] = sittetId.pet_types[i].toLowerCase();
    }
  }
  console.log(select);

  return (
    <div className="w-full h-fit lg:h-full flex flex-col p-10 gap-10 shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)] relative">
      <div className="w-full h-full flex flex-col gap-4">
        <p className="text-b2">Choose your pet</p>
        <div className="w-full h-[70%] flex flex-wrap gap-4">
          {petData.map((pet) => {
            return (
              <div
                key={pet.id}
                className={
                  select[pet.type]
                    ? "w-full lg:w-[30%] h-[240px] lg:h-[50%] hover:bg-ps-orange-100 border border-ps-orange-500 rounded-2xl flex flex-col justify-center items-center relative gap-4"
                    : "w-full lg:w-[30%] h-[240px] lg:h-[50%] hover:bg-ps-orange-100 border border-ps-gray-200 rounded-2xl flex flex-col justify-center items-center relative gap-4"
                }
              >
                <div
                  className={
                    !sittetId.pet_types.includes(pet.type)
                      ? "absolute w-full h-full bg-ps-gray-100 opacity-70 z-10"
                      : "absolute"
                  }
                ></div>
                {!sittetId.pet_types.includes(pet.type) ? null : (
                  <input
                    type="checkbox"
                    value={pet.type}
                    onChange={handlePetSelect}
                    className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-300 hover:border-ps-orange-300 focus:border-ps-orange-300 absolute top-2 right-2"
                  />
                )}
                <Image src={test} alt="test" className="w-20 h-20" />
                <h4 className="text-h4">{pet.name}</h4>
                <p>{petTypeComponents[pet.type]}</p>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => {
              router.push(`/owners/${id}/yourpet/create`);
            }}
            className="w-full lg:w-[30%] h-[240px] lg:h-[50%] hover:bg-ps-orange-200 active:scale-95 bg-ps-orange-100 border-none rounded-2xl flex flex-col justify-center items-center gap-2"
          >
            <Image src={plus} alt="plus" className="w-12 h-12" />
            <h4 className="text-b2 font-bold text-ps-orange-500">
              Create New Pet
            </h4>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          router.push(`/sitters/${id}`);
        }}
        className="btn hover:bg-ps-orange-200 max-lg:w-[45%] lg:px-12 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-[-595px] max-lg:left-4 lg:bottom-14"
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => {
          setStepBooking(2);
        }}
        className={
          checkbox
            ? "btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-12  bg-ps-orange-500 text-b2 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
            : "btn max-lg:w-[45%] lg:px-12 bg-ps-gray-200 text-b2 text-ps-gray-300 border-none rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
        }
        disabled={!checkbox}
      >
        Next
      </button>
    </div>
  );
}

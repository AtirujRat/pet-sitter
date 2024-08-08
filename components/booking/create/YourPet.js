import Image from "next/image";
import plus from "@/public/assets/booking/create/plus.svg";
import {
  DogBadge,
  CatBadge,
  BirdBadge,
  RabbitBadge,
} from "@/components/sitters/PetBadges";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useBooking } from "@/context/Booking";
import { useOwners } from "@/context/Owners";
import { useSitters } from "@/context/SittersProvider";
import Loading from "@/components/Loading";
import { useUser } from "@/context/User";

export default function YourPet() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { petData, setPetData } = useOwners();
  const { sitter, setSitter } = useSitters();
  const {
    setStepBooking,
    addBookingHandle,
    booking,
    handlePetSelect,
    select,
    setPetname,
    setPetId,
    onselectPet,
    setOnselectPet,
  } = useBooking();
  const { setConnection, connection } = useUser();

  const id = router.query.id;

  const checkbox = Object.values(select).includes(true);
  const petTypeComponents = {
    dog: <DogBadge />,
    cat: <CatBadge />,
    bird: <BirdBadge />,
    rabbit: <RabbitBadge />,
  };

  async function getData() {
    console.log(id);
    try {
      if (id) {
        const getDataOwners = await axios.post("/api/owner/getdata", {
          id: booking.owner_id,
        });
        const getDataSittets = await axios.get(`/api/sitters/${id}`);
        setSitter(getDataSittets.data.data[0]);
        setPetData(getDataOwners.data.data);
        addBookingHandle({ ...booking, sitter_id: id });
        setLoading(false);
      }
    } catch (e) {
      setConnection(!connection);
    }
  }

  console.log(booking);

  useEffect(() => {
    getData();
  }, [id]);

  function handleClick(pet, id) {
    if (booking.owner_pet) {
      let pets = booking.owner_pet;
      let ids = booking.pet_id;
      if (pets.includes(pet)) {
        pets.splice(pets.indexOf(pet), 1);
        ids.splice(ids.indexOf(id), 1);
      } else {
        pets.push(pet);
        ids.push(id);
      }
      addBookingHandle({ ...booking, owner_pet: pets, pet_id: ids });
      setPetname(pets);
      setPetId(ids);
      setOnselectPet(!onselectPet);
    }
  }
  if (sitter.pet_types) {
    for (let i = 0; i < sitter.pet_types.length; i++) {
      sitter.pet_types[i] = sitter.pet_types[i].toLowerCase();
    }
  }

  return (
    <>
      {!loading ? (
        <div className="w-full h-fit lg:h-full flex flex-col p-10 gap-10 shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)] relative">
          <div className="w-full h-full flex flex-col gap-4">
            <p className="text-b2">Choose your pet</p>
            <div className="w-full h-[70%] flex flex-wrap gap-4">
              {petData
                ? petData.map((pet) => {
                    return (
                      <div
                        key={pet.id}
                        className={
                          select[pet.name]
                            ? "w-full lg:w-[30%] h-[240px] lg:h-[50%] hover:bg-ps-orange-100 border border-ps-orange-500 rounded-2xl flex flex-col justify-center items-center relative gap-4"
                            : "w-full lg:w-[30%] h-[240px] lg:h-[50%] hover:bg-ps-orange-100 border border-ps-gray-200 rounded-2xl flex flex-col justify-center items-center relative gap-4"
                        }
                      >
                        <div
                          className={
                            !sitter.pet_types.includes(pet.type)
                              ? "absolute w-full h-full bg-ps-gray-100 opacity-70 z-10"
                              : pet.status !== "active"
                              ? "absolute w-full h-full bg-ps-gray-100 opacity-70 z-10"
                              : "absolute"
                          }
                        ></div>
                        {!sitter.pet_types.includes(
                          pet.type
                        ) ? null : pet.status !== "active" ? null : (
                          <input
                            type="checkbox"
                            value={pet.name}
                            onChange={handlePetSelect}
                            checked={select[pet.name]}
                            onClick={() => {
                              handleClick(pet.name, pet.id);
                            }}
                            className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-200 hover:border-ps-orange-300 focus:border-ps-orange-300 absolute top-2 right-2"
                          />
                        )}
                        <Image
                          src={pet.pet_image_url}
                          alt="pet-image"
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <h4 className="text-h4">{pet.name}</h4>
                        <p>{petTypeComponents[pet.type]}</p>
                      </div>
                    );
                  })
                : null}

              <button
                type="button"
                onClick={() => {
                  router.push(`/owners/yourpet/create`);
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
              setStepBooking("information");
            }}
            className={
              checkbox
                ? "btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-12 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
                : "btn max-lg:w-[45%] lg:px-12 bg-ps-gray-200 text-b2 text-ps-gray-300 border-none rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
            }
            disabled={!checkbox}
          >
            Next
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

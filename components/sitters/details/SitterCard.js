import Image from "next/image";
import pin from "/public/assets/icons/icon-location.svg";
import ReviewRating from "@/components/sitters/ReviewRating";
import {
  ButtonOrangeLight,
  ButtonOrange,
} from "@/components/buttons/OrangeButtons";
import {
  DogBadge,
  CatBadge,
  BirdBadge,
  RabbitBadge,
} from "@/components/sitters/PetBadges";
import { useUser } from "@/context/User";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useOwners } from "@/context/Owners";
import AlertTop from "@/components/alerts/AlertTop";

export default function SitterCard({
  sitter,
  ratingStars,
  setIsBookingModalOpen,
}) {
  const petTypeComponents = {
    Dog: DogBadge,
    Cat: CatBadge,
    Bird: BirdBadge,
    Rabbit: RabbitBadge,
  };
  const { userInfo } = useUser();
  const router = useRouter();
  const sitter_id = router.query.id;
  const { getUserAuth } = useOwners();
  const [error, setError] = useState(null);
  const [alertKey, setAlertKey] = useState(0);

  async function handleSendMessage(data) {
    try {
      await axios.post(`/api/owner/${userInfo.id}/conversations`, data);
      setTimeout(() => {
        router.push(`/owners/messages`);
      }, 1000);
    } catch {
      setError(
        "sitter can't create a conversation. Please login pet owner account."
      );
      setAlertKey((prevKey) => prevKey + 1);
    }
  }

  async function handleBookingClick() {
    const ownerData = await getUserAuth();
    if (userInfo.role !== "owner") {
      setError(
        "sitter can't create a booking. Please login pet owner account."
      );
      setAlertKey((prevKey) => prevKey + 1);
      return;
    }
    if (ownerData.email === sitter.email) {
      setError("You cannot book yourself");
      setAlertKey((prevKey) => prevKey + 1);
    } else {
      setIsBookingModalOpen(true);
    }
  }

  return (
    <div className="sitter-card flex flex-col lg:w-[33%] w-full bg-ps-white sm:rounded-2xl h-fit min-w-[370px] lg:sticky top-5">
      {error && <AlertTop type="error" text={error} />}
      <div className="sister-profile px-10 py-10 flex flex-col gap-6 items-center w-full">
        <img
          src={sitter.profile_image_url ?? "/assets/booking/owner-profile.svg"}
          alt={`${sitter.full_name}-profile-image`}
          className="rounded-full object-cover sm:h-[160px] sm:w-[160px] h-[120px] w-[120px] bg-ps-gray-200"
        ></img>
        <div className="sister-info flex flex-col items-center sm:gap-2 gap-1">
          <h2 className="sm:text-h2 text-h3 text-nowrap">
            {sitter.trade_name}
          </h2>
          <div className="subtitle flex justify-center gap-2 max-sm:mb-1">
            <span className="sm:text-h4 text-b1">{sitter.full_name}</span>
            <span className="text-b2 text-ps-green-500">
              {sitter.experience} Exp.
            </span>
          </div>
          <ReviewRating ratingStars={ratingStars} />
          {sitter.sitters_addresses && (
            <div className="location flex gap-1 sm:my-2 my-3 sm:mt-4">
              <Image
                src={pin}
                alt="location"
                className="sm:w-6 sm:h-6 w-4 h-4 self-center"
              />
              <p className="sm:text-b2 text-b3 text-ps-gray-400">
                {sitter.sitters_addresses.district},{" "}
                {sitter.sitters_addresses.province}
              </p>
            </div>
          )}
          <div className="pet-type flex gap-2">
            {sitter.pet_types.map((pet, index) => {
              const BadgeComponent = petTypeComponents[pet];
              return <BadgeComponent key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className="buttons flex p-6 border-t-[1px] border-ps-gray-200 gap-4">
        <div className="max-md:hidden w-full">
          <ButtonOrangeLight
            id="chat"
            text="Send Message"
            width="w-full"
            onClick={() => {
              handleSendMessage({ sitter_id, owner_id: userInfo.id });
            }}
          />
        </div>
        <ButtonOrange
          id="booking"
          text="Booking"
          width="w-full"
          onClick={handleBookingClick}
        />
      </div>
      {/* alert */}
      {error && <AlertTop key={alertKey} type="error" text={error} />}
    </div>
  );
}

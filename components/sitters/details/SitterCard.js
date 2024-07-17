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

export default function SitterCard({ sitter, ratingStars }) {
  const petTypeComponents = {
    Dog: DogBadge,
    Cat: CatBadge,
    Bird: BirdBadge,
    Rabbit: RabbitBadge,
  };
  return (
    <div className="sitter-card flex flex-col w-[33%] bg-ps-white rounded-2xl h-fit min-w-[370px] lg:sticky top-5">
      <div className="sister-profile px-10 py-10 flex flex-col gap-6 items-center w-full">
        <img
          src={sitter.profile_image_url ?? "/assets/account/profile_white.svg"}
          alt={`${sitter.full_name}-profile-image`}
          className="rounded-full object-cover sm:h-[160px] sm:w-[160px] h-[36px] w-[36px] bg-ps-gray-200"
        ></img>
        <div className="sister-info flex flex-col items-center gap-2">
          <h2 className="text-h2 text-nowrap">{sitter.trade_name}</h2>
          <div className="subtitle flex justify-center gap-2 ">
            <span className="text-h4">{sitter.full_name}</span>
            <span className="text-b2 text-ps-green-500">
              {sitter.experience} Exp.
            </span>
          </div>
          <ReviewRating ratingStars={ratingStars} />
          <div className="location flex gap-1 my-2 mt-4">
            <Image
              src={pin}
              alt="location"
              className="sm:w-6 sm:h-6 w-4 h-4 self-center"
            />
            <p className="sm:text-b2 text-b3 text-ps-gray-400">
              Senanikom, Bangkok
            </p>
          </div>
          <div className="pet-type flex gap-2">
            {sitter.pet_types.map((pet, index) => {
              const BadgeComponent = petTypeComponents[pet];
              return <BadgeComponent key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className="buttons flex p-6 border-t-[1px] border-ps-gray-200 gap-4">
        <ButtonOrangeLight id="chat" text="Send Message" width="w-full" />
        <ButtonOrange id="booking" text="Booking" width="w-full" />
      </div>
    </div>
  );
}

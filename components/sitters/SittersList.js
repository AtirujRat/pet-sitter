import ReviewRating from "./ReviewRating";
import Link from "next/link";
import Image from "next/image";
import pin from "/public/assets/sitters/icon-location.svg";
import { DogBadge, CatBadge, BirdBadge, RabbitBadge } from "./PetBadges";

export default function SittersList(props) {
  const petTypeComponents = {
    Dog: DogBadge,
    Cat: CatBadge,
    Bird: BirdBadge,
    Rabbit: RabbitBadge,
  };

  return (
    <div className="sitters-list flex-2 w-[70%] flex flex-col gap-4 max-lg:w-full min-w-[325px] max-sm:px-5">
      {props.sitters.map((sitter) => {
        let galleryImage = "https://placehold.co/400x300";
        const profilePlaceholder = "https://placehold.co/200x200";
        if (sitter.sitters_images.length > 0) {
          galleryImage = sitter.sitters_images[0].image_url;
        }
        return (
          <div key={sitter.id}>
            <Link href={`/sitters/${sitter.id}`}>
              <div className="sitter-item bg-ps-white p-4 flex xl:gap-9 sm:gap-3 gap-2 rounded-2xl hover:shadow-lg transition-transform active:scale-95 max-xl:flex-col">
                <img
                  src={galleryImage}
                  alt={`first gallery image for ${sitter.full_name}`}
                  className="h-[185px] w-[245px] rounded-lg object-cover self-center max-xl:w-full max-sm:h-[100px]"
                ></img>
                <div className="setter-info flex-col w-full">
                  <div className="profile flex gap-5 my-2">
                    <img
                      src={sitter.profile_image_url ?? profilePlaceholder}
                      alt={`${sitter.full_name}-profile-image`}
                      className="rounded-full object-cover sm:h-[64px] sm:w-[64px] h-[36px] w-[36px]"
                    ></img>
                    <div className="sitter-title w-full">
                      <h3 className="sm:text-h3 text-lg font-bold leading-6">
                        {sitter.trade_name}
                      </h3>
                      <p className="sm:text-b1 sm:leading-8 text-b3">
                        By {sitter.full_name}
                      </p>
                    </div>
                    <ReviewRating />
                  </div>
                  <div className="location flex gap-1 sm:my-6 my-2.5">
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
                    {sitter.pet_types
                      .sort((a, b) => a.id - b.id)
                      .map((pet) => {
                        const BadgeComponent = petTypeComponents[pet.pet_type];
                        return <BadgeComponent key={pet.id} />;
                      })}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

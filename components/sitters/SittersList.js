import ReviewRating from "./ReviewRating";
import Link from "next/link";
import Image from "next/image";
import pin from "/public/assets/icons/icon-location.svg";
import goUp from "/public/assets/icons/icon-up.svg";
import { DogBadge, CatBadge, BirdBadge, RabbitBadge } from "./PetBadges";
import { useMediaQuery } from "react-responsive";
import Loading from "../Loading";
import useCalculateRatingStars from "@/hook/useCalculateRatingStars";
import { useSitters } from "@/context/SittersProvider";

const ITEMS_PER_PAGE = 5;

export default function SittersList() {
  const { sitters, filteredRating, currentPage, setTotalPages, loading } = useSitters()
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const petTypeComponents = {
    Dog: DogBadge,
    Cat: CatBadge,
    Bird: BirdBadge,
    Rabbit: RabbitBadge,
  };

  const filteredSitters = sitters.filter((sitter) => {
    const { ratingStars } = useCalculateRatingStars(sitter.bookings);
    return filteredRating === null || ratingStars === filteredRating;
  });

  setTotalPages(Math.ceil(filteredSitters.length / ITEMS_PER_PAGE));

  const currentSitters = isDesktop
    ? filteredSitters.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : filteredSitters;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="sitters-list flex-2 w-[70%] flex flex-col gap-4 max-lg:w-full min-w-[325px] max-sm:px-5">
        {currentSitters.length === 0 ? (
          <div className="notfound text-center text-ps-gray-600 text-b1  h-full w-full p-4 rounded-2xl max-xl:flex-col">
            Sitter not found
          </div>
        ) : (
          currentSitters.map((sitter) => {
            let galleryImage = "https://placehold.co/400x300";

            if (sitter.sitters_images.length > 0) {
              galleryImage = sitter.sitters_images[0].image_url;
            }

            const { ratingStars } = useCalculateRatingStars(sitter.bookings);

            return (
              <div key={sitter.id}>
                <Link href={`/sitters/${sitter.id}`}>
                  <div className="sitter-item bg-ps-white p-4 flex xl:gap-9 sm:gap-3 gap-2 rounded-2xl hover:shadow-lg transition-transform active:scale-95 max-xl:flex-col">
                    <img
                      src={galleryImage}
                      alt={`first gallery image for ${sitter.full_name}`}
                      className="h-[185px] w-[245px] rounded-lg object-cover object-center self-center max-xl:w-full max-sm:h-[100px]"
                    ></img>
                    <div className="setter-info flex-col w-full">
                      <div className="profile flex gap-5 my-2">
                        <img
                          src={
                            sitter.profile_image_url ??
                            "/assets/account/profile_white.svg"
                          }
                          alt={`${sitter.full_name}-profile-image`}
                          className="rounded-full object-cover sm:h-[64px] sm:max-h-[64px] sm:min-w-[64px] sm:w-[64px] h-[36px] w-[36px] max-h-[36px] min-w-[36px] bg-ps-gray-200"
                        ></img>
                        <div className="sitter-title w-full">
                          <h3 className="sm:text-h3 text-lg font-bold leading-6">
                            {sitter.trade_name}
                          </h3>
                          <p className="sm:text-b1 sm:leading-8 text-b3">
                            By {sitter.full_name}
                          </p>
                        </div>
                        <ReviewRating
                          sitter={sitter}
                          ratingStars={ratingStars}
                        />
                      </div>
                      {sitter.sitters_addresses && (
                        <div className="location flex gap-1 sm:my-6 my-2.5">
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
                </Link>
              </div>
            );
          })
        )}
      </div>
      <button
        className="lg:hidden rounded-full px-3 py-3 bg-ps-orange-100 justify-center items-center flex w-16 h-16 self-end max-sm:mx-5 relative -top-14"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <Image src={goUp} width={24} height={24} alt="Go up" />
      </button>
    </>
  );
}

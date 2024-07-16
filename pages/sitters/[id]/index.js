import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import pin from "/public/assets/icons/icon-location.svg";
import ReviewRating from "@/components/sitters/ReviewRating";
import Loading from "@/components/Loading";
import Gallery from "@/components/sitters/details/Gallery";
import Reviews from "@/components/sitters/details/Reviews";
import {
  DogBadge,
  CatBadge,
  BirdBadge,
  RabbitBadge,
} from "@/components/sitters/PetBadges";
import {
  ButtonOrangeLight,
  ButtonOrange,
} from "@/components/buttons/OrangeButtons";

export default function SitterDetails() {
  const [sitter, setSitter] = useState({});
  const [loading, setLoading] = useState(true);
  const id = useRouter().query.id;
  const ratingStars = 5;
  // const ratingStars = calculateRatingStars(sitter.bookings);
  const petTypeComponents = {
    Dog: DogBadge,
    Cat: CatBadge,
    Bird: BirdBadge,
    Rabbit: RabbitBadge,
  };

  const getSitter = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/sitters/${id}`);
      setSitter(res.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sitter data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getSitter();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const OPTIONS = { loop: true };
  const SLIDES = sitter.sitters_images;

  return (
    <section className="w-full flex flex-col items-center bg-[#FAFAFB] sm:py-1 lg:pb-32 ">
      {/*--- To add gallery module ---*/}
      <Gallery slides={SLIDES} options={OPTIONS} />
      <div className="page-container w-full px-20 max-w-[1440px] flex justify-center gap-4">
        <div className="left-container w-[67%] flex flex-col gap-10">
          <div className="sitter-details w-full flex flex-col gap-12 py-6 px-20 ">
            <h1 className="trade-name text-h1">{sitter.trade_name}</h1>
            <div className="introduction flex flex-col gap-3">
              <h3 className="text-h3">Introduction</h3>
              <p className="text-b2 text-ps-gray-500">{sitter.introduction}</p>
            </div>
            <div className="service flex flex-col gap-3">
              <h3 className="text-h3">Services</h3>
              <p className="text-b2 text-ps-gray-500">{sitter.services}</p>
            </div>
            <div className="my-place flex flex-col gap-3">
              <h3 className="text-h3">My Place</h3>
              <p className="text-b2 text-ps-gray-500">
                {sitter.place_description}
              </p>
            </div>
          </div>
          <Reviews />
        </div>
        <div className="sitter-card flex flex-col w-[33%] bg-ps-white rounded-2xl h-fit min-w-[370px] lg:sticky top-5">
          <div className="sister-profile px-10 py-10 flex flex-col gap-6 items-center w-full">
            <img
              src={sitter.profile_image_url}
              alt={`${sitter.full_name}-profile-image`}
              className="rounded-full object-cover sm:h-[160px] sm:w-[160px] h-[36px] w-[36px]"
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
      </div>
    </section>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3000/api/sitters"); //
//   const sitters = await res.json();
//   const paths = sitters.data.map((sitter) => ({
//     params: { id: sitter.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { id } = params;
//   const res = await fetch(`http://localhost:3000/api/sitters/${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

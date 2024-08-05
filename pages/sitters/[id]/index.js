import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Gallery from "@/components/sitters/details/Gallery";
import Reviews from "@/components/sitters/details/Reviews";
import SitterCard from "@/components/sitters/details/SitterCard";
import SitterDescriptions from "@/components/sitters/details/SitterDescriptions";
import useCalculateRatingStars from "@/hook/useCalculateRatingStars";
import Modal from "@/components/modal/Modal";
import BookingModal from "@/components/booking/BookingModal";
import { useSitters } from "@/context/SittersProvider";
import { useSearch } from "@/context/Search";

export default function SitterDetails() {
  const { sitter, setSitter, isBookingModalOpen, setIsBookingModalOpen } =
    useSitters();
  const [loading, setLoading] = useState(true);
  const id = useRouter().query.id;
  const { ratingStars, averageRating } = useCalculateRatingStars(
    sitter.bookings
  );
  const { location } = useSearch();

  async function getSitter() {
    try {
      const res = await axios.get(`/api/sitters/${id}`);
      setSitter(res.data.data[0]);
      if (res.data.data[0].sitters_addresses) {
        location({
          lat: res.data.data[0].sitters_addresses.lat,
          lng: res.data.data[0].sitters_addresses.lng,
        });
      } else {
        console.warn("No address data found for this sitter.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sitter data:", error);
    }
  }

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
    <section className="w-full flex flex-col items-center bg-[#FAFAFB] sm:pt-1 lg:pb-32 sm:pb-14">
      <Gallery slides={SLIDES} options={OPTIONS} />
      <div className="page-container w-full lg:px-20 sm:px-5 max-w-[1440px] flex max-lg:flex-col lg:justify-center gap-4">
        <div className="left-container lg:w-[67%] w-full flex flex-col sm:gap-10">
          <SitterDescriptions sitter={sitter} />
          <div className="lg:hidden w-full">
            <SitterCard
              sitter={sitter}
              ratingStars={ratingStars}
              setIsBookingModalOpen={setIsBookingModalOpen}
            />
          </div>
          <Reviews sitter={sitter} averageRating={averageRating} />
        </div>
        <div className="max-lg:hidden">
          <SitterCard
            sitter={sitter}
            ratingStars={ratingStars}
            setIsBookingModalOpen={setIsBookingModalOpen}
          />
        </div>
      </div>
      {isBookingModalOpen && (
        <Modal>
          <BookingModal closeModal={setIsBookingModalOpen} sitterId={id} />
        </Modal>
      )}
    </section>
  );
}

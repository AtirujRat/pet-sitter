import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Gallery from "@/components/sitters/details/Gallery";
import Reviews from "@/components/sitters/details/Reviews";
import SitterCard from "@/components/sitters/details/SitterCard";
import SitterDescriptions from "@/components/sitters/details/SitterDescriptions";
import useCalculateRatingStars from "@/hook/useCalculateRatingStars";

export default function SitterDetails() {
  const [sitter, setSitter] = useState({});
  const [loading, setLoading] = useState(true);
  const id = useRouter().query.id;
  const { ratingStars, averageRating } = useCalculateRatingStars(
    sitter.bookings
  );

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
      <Gallery slides={SLIDES} options={OPTIONS} />
      <div className="page-container w-full px-20 max-w-[1440px] flex justify-center gap-4">
        <div className="left-container w-[67%] flex flex-col gap-10">
          <SitterDescriptions sitter={sitter} />
          <Reviews sitter={sitter} averageRating={averageRating} />
        </div>
        <SitterCard sitter={sitter} ratingStars={ratingStars} />
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

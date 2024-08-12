import Image from "next/image";
import star from "/public/assets/star-rating.svg";
import { useSitters } from "@/context/SittersProvider";

export default function ReviewRating(props) {
  const { selectMap } = useSitters();

  return (
    <div className="rating flex min-w-fit h-fit mt-1 mr-2 gap-1">
      {Array.from({ length: props.ratingStars }).map((_, index) => (
        <Image
          src={star}
          alt="rating star"
          className="sm:w-5 sm:h-5 w-4 h-4"
          key={index}
        />
      ))}
    </div>
  );
}

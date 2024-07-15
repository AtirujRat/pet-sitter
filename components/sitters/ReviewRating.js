import Image from "next/image";
import star from "/public/assets/star-rating.svg";

export default function ReviewRating(props) {

  return (
    <div className="rating flex min-w-fit h-fit mt-1 mr-2 gap-1">
      {Array.from({ length: props.ratingStars }).map((_, index) => (
        <Image
          src={star}
          alt="rating star"
          className="sm:w-5 sm:h-5 w-3 h-3"
          key={index}
        />
      ))}
    </div>
  );
}

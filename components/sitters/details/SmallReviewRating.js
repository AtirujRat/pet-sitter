import Image from "next/image";
import star from "/public/assets/star-rating.svg";

export default function SmallReviewRating(props) {

  return (
    <div className="rating flex min-w-fit h-fit gap-1">
      {Array.from({ length: props.ratingStars }).map((_, index) => (
        <Image
          src={star}
          alt="rating star"
          className="sm:w-4 sm:h-4 w-3 h-3"
          key={index}
        />
      ))}
    </div>
  );
}

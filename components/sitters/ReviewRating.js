import Image from "next/image";
import star from "/public/assets/star-rating.svg";

export default function ReviewRating(props) {
  let ratingStars = 0;
  if (props.sitter.bookings) {
    const totalRating = props.sitter.bookings.reduce(
      (acc, cur) => acc + cur.reviews[0].rating,
      0
    );
    const averageRating = totalRating / props.sitter.bookings.length;
    ratingStars = Math.round(averageRating);
  }

  return (
    <div className="rating flex min-w-fit h-fit mt-1 mr-2 gap-1">
      {Array.from({ length: ratingStars }).map((_, index) => (
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

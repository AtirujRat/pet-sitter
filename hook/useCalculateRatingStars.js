export default function CalculateRatingStars(bookings) {
  let ratingStars = 0;
  let averageRating = null;

  if (bookings) {
    const approvedReviews = bookings.filter(
      (booking) => booking.reviews.status === "approved"
    );

    if (approvedReviews.length === 0) {
      return 0;
    }

    const totalRating = approvedReviews.reduce(
      (acc, cur) => acc + cur.reviews.rating,
      0
    );
    averageRating = (totalRating / approvedReviews.length).toFixed(2);
    ratingStars = Math.round(averageRating);
  }

  return { ratingStars, averageRating };
}

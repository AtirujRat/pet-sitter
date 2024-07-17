export default function useCalculateRatingStars(bookings) {
  let ratingStars = 0;
  let averageRating = null;

  if (bookings) {
    const approvedReviews = bookings.filter(
      (booking) => booking.reviews[0].status === "approved"
    );

    if (approvedReviews.length === 0) {
      return 0;
    }

    const totalRating = approvedReviews.reduce(
      (acc, cur) => acc + cur.reviews[0].rating,
      0
    );

    averageRating = totalRating / approvedReviews.length;
    ratingStars = Math.round(averageRating);
  }

  return { ratingStars, averageRating };
}

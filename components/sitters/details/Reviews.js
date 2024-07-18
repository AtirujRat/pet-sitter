import RatingFilter from "./RatingFilter";
import ReviewRating from "@/components/sitters/ReviewRating";
import { useState } from "react";
import SmallReviewRating from "./SmallReviewRating";

export default function Reviews({ sitter, averageRating }) {
  const [selectedRating, setSelectedRating] = useState(null);
  const reviews = sitter.bookings;

  const selectedReviews = reviews
    .filter((review) => {
      return (
        selectedRating === null || review.reviews[0].rating === selectedRating
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.reviews[0].updated_at);
      const dateB = new Date(b.reviews[0].updated_at);
      return dateB - dateA;
    });

  return (
    <div className="reviews-container w-full h-fit bg-[#f6f6f9] sm:rounded-tl-[120px] rounded-bl-2xl rounded-r-2xl flex flex-col sm:gap-4 gap-6 sm:p-6 p-4 max-sm:pb-10">
      <div className="reviews-bar w-full m h-fit bg-ps-white rounded-r-xl sm:rounded-l-[99px] max-sm:rounded-tl-[99px] max-sm:rounded-bl-xl p-6 sm:gap-10 gap-4 flex max-sm:flex-col">
        <div className="bg-ps-black w-[146px] h-[146px] min-w-[146px] max-h-[146px] rounded-full rounded-br-none flex flex-col justify-center items-center">
          <h2 className="text-h2 text-ps-white">{averageRating}</h2>
          <p className="text-b3 text-ps-white">
            {reviews.length === 0 ? "No" : reviews.length} Reviews
          </p>
        </div>
        <div className="rating-filter flex flex-col gap-4">
          <h3 className="sm:text-h3 text-h4">Rating & Reviews</h3>
          <RatingFilter
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        </div>
      </div>
      {selectedReviews.length === 0 ? (
        <p className="notfound w-full p-6 text-b2 text-ps-gray-500 text-center">
          No reviews
        </p>
      ) : (
        selectedReviews.map((review) => {
          let options = { year: "numeric", month: "short", day: "numeric" };
          const reviewDate = new Date(review.reviews[0].updated_at);
          const formattedReviewDate = reviewDate.toLocaleDateString(
            "en-US",
            options
          );

          return (
            <div className="review w-full h-fit flex max-xl:flex-col gap-4 sm:px-6 sm:pt-6 sm:pb-10 pb-6 border-b border-b-ps-gray-200">
              <div className="reviewer-profile flex max-xl:justify-between xl:w-[220px] w-full">
                <div className="flex gap-4">
                  <img
                    className="sm:w-14 sm:h-14 w-9 h-9 rounded-full object-cover bg-ps-gray-200"
                    src={
                      review.owners.profile_image_url ??
                      "/assets/account/profile_white.svg"
                    }
                  ></img>
                  <div className="reviewer-name">
                    <p className="text-b1">{review.owners.full_name}</p>
                    <p className="text-b3 text-ps-gray-400">
                      {formattedReviewDate}
                    </p>
                  </div>
                </div>
                <div className="xl:hidden h-3">
                  <SmallReviewRating ratingStars={review.reviews[0].rating} />
                </div>
              </div>
              <div className="review-content w-full flex flex-col gap-4">
                <div className="max-xl:hidden">
                  <ReviewRating ratingStars={review.reviews[0].rating} />
                </div>
                <p className="sm:text-b2 text-b3 text-ps-gray-500">
                  {review.reviews[0].description}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
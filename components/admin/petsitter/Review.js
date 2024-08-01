import Image from "next/image";
import ReviewRating from "@/components/sitters/ReviewRating";
import CheckIcon from "@/public/assets/admin/check-icon.svg";
import TrashIcon from "@/public/assets/admin/trash-icon.svg";

export default function Review({ sitter }) {
  const reviews = sitter.bookings;

  return (
    <div className="reviews-container w-full h-fit flex flex-col gap-4 p-6">
      {reviews.length === 0 ? (
        <p className="notfound w-full p-6 text-b2 text-ps-gray-500 text-center">
          No reviews
        </p>
      ) : (
        reviews.map((review, index) => {
          let options = { year: "numeric", month: "short", day: "numeric" };
          const reviewDate = new Date(review?.reviews?.updated_at);
          const formattedReviewDate = reviewDate.toLocaleDateString(
            "en-US",
            options
          );

          return (
            <div
              key={index}
              className="review w-full h-fit flex gap-4 px-6 pt-6 pb-10 border-b border-b-ps-gray-200"
            >
              <div className="reviewer-profile flex w-[220px]">
                <div className="flex gap-4">
                  <img
                    className="w-14 h-14 rounded-full object-cover bg-ps-gray-200"
                    src={
                      review?.owners?.profile_image_url ??
                      "/assets/booking/owner-profile.svg"
                    }
                  />
                  <div className="reviewer-name shrink-0">
                    <p className="text-b1">
                      {review?.owners?.full_name || "-"}
                    </p>
                    <p className="text-b3 text-ps-gray-400">
                      {formattedReviewDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="review-content flex flex-col gap-4 grow">
                <div>
                  <ReviewRating ratingStars={review?.reviews?.rating} />
                </div>
                <p className="text-b2 text-ps-gray-500">
                  {review?.reviews?.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Image src={TrashIcon} alt="TrashIcon" width={60} height={60} />
                <Image src={CheckIcon} alt="CheckIcon" width={60} height={60} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

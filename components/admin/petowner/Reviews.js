import Loading from "@/components/Loading";
import { useAdminPetOwner } from "@/context/AdminPetOwner";
import axios from "axios";
import { useEffect, useState } from "react";
import gray_star from "@/public/assets/review/gray-star.svg";
import green_star from "@/public/assets/review/green-star.svg";
import { useGetOnlyDate } from "@/hook/useGetOnlyDate";
import Image from "next/image";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentOwner } = useAdminPetOwner();
  async function getReviews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/reviews/reviews`);

      if (response) {
        const filteredReview = response.data.filter((item) => {
          return item.bookings.owner_id === currentOwner.id;
        });

        setReviews(filteredReview);
        setError(null);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      setError("Could not get reviews");
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      {!reviews[0] ? (
        <h1>There is no reviews</h1>
      ) : (
        <div>
          {loading && <Loading />}
          {error && <h1 className="text-h3">{error}</h1>}
          {reviews.map((review, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between flex-col gap-[350px] "
              >
                <div className="w-full  flex  justify-start gap-[16px] pb-[40px] pt-[24px] px-[24px] border-b-[1px] border-ps-gray-200">
                  <div className="w-[220px]   flex items-center gap-[16px] ">
                    <img
                      className="w-[56px] h-[56px] rounded-full object-cover"
                      src={review.bookings.sitters.profile_image_url}
                      alt="cross icon"
                    />
                    <div>
                      <h1 className="text-b1">
                        {review.bookings.sitters.full_name}
                      </h1>
                      <h1 className="text-ps-gray-400 text-b3">
                        {useGetOnlyDate(review.created_at)}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col w-[80%]">
                    <div className="flex gap-[2px] h-[32px] ">
                      {[0, 1, 2, 3, 4].map((item, index) => {
                        return (
                          <Image
                            key={item}
                            className="w-[20px] h-[20px]"
                            src={
                              index + 1 <= review.rating
                                ? green_star
                                : gray_star
                            }
                            alt="stars icon"
                          />
                        );
                      })}
                    </div>
                    <h1 className="text-ps-gray-500 text-b2">
                      {review.description}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

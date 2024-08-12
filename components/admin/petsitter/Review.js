import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useAdminPetSitter } from "@/context/AdminPetSitter";
import { useUser } from "@/context/User";

import OwnerProfile from "@/public/assets/booking/owner-profile.svg";
import ReviewRating from "@/components/sitters/ReviewRating";
import CheckIcon from "@/public/assets/admin/check-icon.svg";
import TrashIcon from "@/public/assets/admin/trash-icon.svg";
import close from "@/public/assets/icons/icon-x.svg";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import BookingModal from "@/components/sitters/booking/BookingModal";
import Pagination from "../../Pagination";
import ConnectionServer from "@/components/ConnectionServer";

export default function Review({ sitter }) {
  const [reviews, setReviews] = useState(sitter.bookings);
  const [showTextAlert, setShowTextAlert] = useState("");
  const [showTypeAlert, setShowTypeAlert] = useState("");
  const {
    refresh,
    setRefresh,
    totalReviewPages,
    setTotalReviewPages,
    currentReviewPage,
    setCurrentReviewPage,
  } = useAdminPetSitter();
  const { setConnection, connection } = useUser();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  function handlerCloseModal() {
    setOpenDeleteModal(false);
  }

  let currentSitters = reviews;
  const ITEMS_PER_PAGE = 5;
  setTotalReviewPages(Math.ceil(reviews.length / ITEMS_PER_PAGE));
  if (reviews.length > 5) {
    currentSitters = reviews.slice(
      (currentReviewPage - 1) * ITEMS_PER_PAGE,
      currentReviewPage * ITEMS_PER_PAGE
    );
  }

  async function updateReviewStatus(reviewId, newStatus) {
    try {
      await axios.patch("/api/admin/review", {
        reviewId,
        newStatus,
      });

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviews.id !== reviewId)
      );
      setConnection(!connection);
      setRefresh(!refresh);
    } catch (error) {
      setShowTypeAlert("error");
      setShowTextAlert("Please try again");
      setConnection(!connection);
      return;
    }
  }

  return (
    <div className="reviews-container w-full h-fit flex flex-col gap-4 p-6">
      {connection && (
        <ConnectionServer type={showTypeAlert} text={showTextAlert} />
      )}
      {reviews.length === 0 ? (
        <p className="notfound w-full p-6 text-b2 text-ps-gray-500 text-center">
          No reviews
        </p>
      ) : (
        currentSitters.map((review, index) => {
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
                  <Image
                    className="w-14 h-14 rounded-full object-cover bg-ps-gray-200"
                    src={review?.owners?.profile_image_url ?? OwnerProfile}
                    alt={review?.owners?.full_name || "-"}
                    width={56}
                    height={56}
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
              <div className="review-content flex flex-col gap-4 grow w-full ">
                <div>
                  <ReviewRating ratingStars={review?.reviews?.rating} />
                </div>
                <p className="text-b2 text-ps-gray-500">
                  {review?.reviews?.description}
                </p>
              </div>
              <div className="flex gap-2 cursor-pointer">
                <Image
                  src={TrashIcon}
                  alt="TrashIcon"
                  width={60}
                  height={60}
                  onClick={() => {
                    setSelectedReviewId(review.reviews.id);
                    setOpenDeleteModal(true);
                  }}
                />
                <Image
                  src={CheckIcon}
                  alt="CheckIcon"
                  width={60}
                  height={60}
                  onClick={() => {
                    updateReviewStatus(review.reviews.id, "approved");
                    setShowTypeAlert("success");
                    setShowTextAlert("Approved Successfully");
                  }}
                />
              </div>
            </div>
          );
        })
      )}
      <Pagination
        currentPage={currentReviewPage}
        setCurrentPage={setCurrentReviewPage}
        totalPages={totalReviewPages}
      />

      {/* Modal Delete */}
      <BookingModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        closeModal={handlerCloseModal}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="max-w-[400px] w-full min-w-0 h-[208px] bg-ps-white rounded-2xl">
            <div className="border-b border-ps-gray-200 py-4 px-6 text-h4 flex justify-between">
              Delete Confirmation
              <Image
                src={close}
                width={24}
                height={24}
                alt="close"
                className="cursor-pointer"
                onClick={() => setOpenDeleteModal(false)}
              />
            </div>

            <div className="max-w[352px] w-full p-6 flex flex-col gap-6">
              <p className="text-b2 text-ps-gray-400">
                Are you sure to delete this review?
              </p>
              <div className="flex w-full justify-between">
                <ButtonOrangeLight
                  id="cancel"
                  text="Cancel"
                  width="w-[120px]"
                  onClick={() => setOpenDeleteModal(false)}
                />
                <ButtonOrange
                  id="Delete"
                  text="Delete"
                  width="w-fit"
                  onClick={() => {
                    setOpenDeleteModal(false);
                    updateReviewStatus(selectedReviewId, "rejected");
                    setShowTypeAlert("success");
                    setShowTextAlert("Delete Successfully");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </BookingModal>
    </div>
  );
}

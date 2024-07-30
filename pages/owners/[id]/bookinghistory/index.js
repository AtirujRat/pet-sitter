import React, { useEffect, useState } from "react";
import Image from "next/image";
import phone_icon from "@/public/assets/booking/phone.svg";
import pen_icon from "@/public/assets/booking/pen.svg";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import Modal from "@/components/modal/Modal";
import ReportModal from "@/components/bookinghistory/ReportModal";
import BookingDetailModal from "@/components/bookinghistory/BookingDetailModal";
import { useGetOnlyDate } from "@/hook/useGetOnlyDate";
import { useGetOnlyTime } from "@/hook/useGetOnlyTime";
import { useCalculateDutation } from "@/hook/useCalculatedDuration";
import axios from "axios";
import Loading from "@/components/Loading";
import ReviewModal from "@/components/review/ReviewModal";
import YourReview from "@/components/review/YourReview";
import SideBarOwners from "@/components/owners/SideBarOwners";
import { useOwners } from "@/context/Owners";
import { useRouter } from "next/router";

const BOOKING_STATUS = {
  Waiting_for_confirm: "ps-pink-500",
  Waiting_for_service: "ps-yellow-200",
  In_service: "ps-blue-500",
  Success: "ps-green-500",
  Canceled: "ps-red",
};

export default function BookingHistory() {
  const [bookingList, setBookingList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ownerData, setOnwerData] = useState();
  const [isReportModalOpened, setIsReportModalOpened] = useState(false);
  const [isBookingDetailModalOpened, setIsBookingDetailModalOpened] =
    useState(false);
  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isYourReviewModalOpened, setIsYourReviewModalOpened] = useState(false);

  const [currentReview, setCurrentReview] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getUserAuth } = useOwners();

  const router = useRouter();
  const { id } = router.query;

  async function getBookingHistory() {
    try {
      if (id) {
        const ownerEmail = await getUserAuth();

        const ownerData = await axios.get(
          `/api/owner/${ownerEmail.email}/queryowner`
        );
        setOnwerData(ownerData.data);

        const getBookingList = await axios.get(`/api/owner/${id}/booking`);

        setBookingList(getBookingList.data);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Could not fetch Booking List");
      setLoading(false);
      console.log(error);
      return;
    }
  }

  async function getReviews() {
    try {
      const getRating = await axios.get("/api/reviews/rating");
      setReviews(getRating.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getBookingHistory();
    getReviews();
  }, [currentIndex, id]);

  function toggleReportModal(index) {
    setCurrentIndex(index);
    setIsReportModalOpened((prev) => !prev);
  }

  function toggleBookingDetailModal(index) {
    setCurrentIndex(index);
    setIsBookingDetailModalOpened((prev) => !prev);
  }

  function toggleReviewModal(index) {
    setCurrentIndex(index);
    setIsReviewModalOpened((prev) => !prev);
  }
  function toggleYourReviewModal(id) {
    setCurrentReview(id);
    setIsYourReviewModalOpened((prev) => !prev);
  }

  return (
    <div className="flex gap-5 flex-col justify-center lg:flex-row  max-w-screen-xl mx-auto mt-4">
      <SideBarOwners />
      <div className="w-full lg:w-[965px] h-fit shadow-md rounded-2xl p-[10px] lg:p-[40px] flex flex-col items-start gap-[40px] lg:gap-[45px]">
        <h1 className="text-h3">Booking History</h1>
        {loading && <Loading />}
        {error && <h1 className="text-ps-red">{error}</h1>}

        {bookingList.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-fit rounded-2xl border-[1px] border-ps-gray-200 p-[24px]"
            >
              {isBookingDetailModalOpened && (
                <Modal closeModal={toggleBookingDetailModal}>
                  <BookingDetailModal
                    closeModal={toggleBookingDetailModal}
                    bookingList={bookingList}
                    index={currentIndex}
                  />
                </Modal>
              )}
              <div
                onClick={() => toggleBookingDetailModal(index)}
                className="flex flex-col min-[600px]:flex-row justify-between h-fit pb-[16px] gap-[16px] border-b-[1px] border-ps-gray-200 cursor-pointer"
              >
                <div className="flex items-center gap-[16px] ">
                  <img
                    className="w-[64px] h-[64px] rounded-full"
                    src={item.sitters.profile_image_url}
                    alt="sitter profile"
                  />

                  <div className="w-[80%]">
                    <h1 className="text-h3">{item.sitters.trade_name}</h1>
                    <h1 className="text-b1">By {item.sitters.full_name}</h1>
                  </div>
                </div>
                <div className="flex flex-col items-start min-[600px]:items-end gap-[12px]">
                  <h1 className="text-b3 text-ps-gray-300">
                    Transaction date: Tue, 16 Aug 2023
                  </h1>
                  <li
                    className={`text-${
                      BOOKING_STATUS[item.status.replace(/ /g, "_")]
                    }`}
                  >
                    {item.status}
                  </li>
                </div>
              </div>

              <div className="flex flex-col  md:flex-row gap-[10px] sm:gap-[15px] justify-between mt-[16px] ">
                <div className=" w-full md:w-[60%]">
                  <h1 className="text-ps-gray-400 text-b3">Date & Time:</h1>
                  <div className="flex items-center gap-[12px]">
                    <span className="text-b3 2xl:text-b2 text-ps-gray-600">
                      {useGetOnlyDate(item.start_time)}
                    </span>
                    <span className="text-b2 text-ps-gray-400">|</span>
                    <span className="text-b3 2xl:text-b2 text-ps-gray-600">
                      {useGetOnlyTime(item.start_time)} -{" "}
                      {useGetOnlyTime(item.end_time)}
                    </span>
                    {item.status === "Waiting for confirm" && (
                      <button className="text-b3 2xl:text-b2 font-[700] text-ps-orange-500 flex gap-1">
                        <Image
                          className="w-[22px] h-[22px]"
                          src={pen_icon}
                          alt="pen icon"
                        />{" "}
                        Change
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] sm:flex-row w-full md:w-[50%] sm:gap-[50px]">
                  <div className="relative flex md:w-[50%]">
                    <div className="hidden md:block relative md:top-[10%] bg-ps-gray-200 mt-[10px] w-[1px] h-[35px] mx-[36px]"></div>
                    <div>
                      <h1 className="text-ps-gray-400 text-b3">Duration:</h1>
                      <h1 className="text-ps-gray-600 text-b3 2xl:text-b2">
                        {useCalculateDutation(item.start_time, item.end_time)}{" "}
                      </h1>
                    </div>
                  </div>

                  <div className="relative flex md:w-[50%]">
                    <div className="hidden md:block relative md:top-[10%] bg-ps-gray-200 mt-[10px] w-[1px] h-[35px] mr-10"></div>
                    <div>
                      <h1 className="text-ps-gray-400 text-b3">Pet:</h1>
                      <p className="text-ps-gray-600 text-b3 2xl:text-b2">
                        {item.pets.map((pet, index) => (
                          <span key={index}>
                            {pet.name}
                            {index < item.pets.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  item.status === "Success"
                    ? "bg-ps-green-100"
                    : "bg-ps-gray-100 "
                } w-full h-fit sm:h-[80px] flex items-start sm:items-center flex-col sm:flex-row justify-between mt-[36px] rounded-2xl p-[16px] gap-[16px]`}
              >
                {item.status === "Success" ? (
                  <div>
                    <h1 className={`text-${BOOKING_STATUS.Success}`}>
                      Success Date:
                    </h1>
                    <h1 className={`flex gap-[10px]`}>
                      <span className={`text-${BOOKING_STATUS.Success}`}>
                        {useGetOnlyDate(item.last_updated)}
                      </span>{" "}
                      <span className={`text-${BOOKING_STATUS.Success}`}>
                        |
                      </span>
                      <span className={`text-${BOOKING_STATUS.Success}`}>
                        {useGetOnlyTime(item.last_updated)}
                      </span>
                    </h1>
                  </div>
                ) : (
                  <p className="text-ps-gray-400 text-b3">
                    Waiting Pet Sitter for confirm booking
                  </p>
                )}
                <div className="flex items-center gap-5">
                  {item.status === "Success" ? (
                    <>
                      {isReportModalOpened && (
                        <Modal closeModal={toggleReportModal}>
                          <ReportModal
                            closeModal={toggleReportModal}
                            bookingList={bookingList}
                            index={currentIndex}
                          />
                        </Modal>
                      )}

                      <button
                        onClick={() => toggleReportModal(index)}
                        className="text-b2 font-[700] text-ps-orange-500"
                      >
                        Report
                      </button>
                      {isReviewModalOpened && (
                        <Modal closeModal={toggleReviewModal}>
                          <ReviewModal
                            closeModal={toggleReviewModal}
                            bookingList={bookingList}
                            index={currentIndex}
                          />
                        </Modal>
                      )}
                      {isYourReviewModalOpened && (
                        <Modal closeModal={toggleYourReviewModal}>
                          <YourReview
                            ownerData={ownerData}
                            reviews={reviews}
                            currentReview={currentReview}
                            closeModal={toggleYourReviewModal}
                          />
                        </Modal>
                      )}
                      {reviews
                        .map((review) => review.booking_id)
                        .includes(item.id) ? (
                        <div onClick={() => toggleYourReviewModal(item.id)}>
                          <ButtonOrangeLight
                            text="Your review"
                            width="w-[120px] h-[48px] text-b2 font-[700]"
                          />
                        </div>
                      ) : (
                        <div onClick={() => toggleReviewModal(index)}>
                          <ButtonOrange
                            text="Review"
                            width="w-[120px] h-[48px] text-b2 font-[700]"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {item.status === "Waiting for confirm" && (
                        <button className="text-b3 2xl:text-b2 font-[700] text-ps-orange-500 flex gap-1">
                          cancel
                        </button>
                      )}
                      <ButtonOrange
                        text="Send Message"
                        width="w-[156px] h-[48px] text-b2 font-[700]"
                        onClick={() => router.push(`/owners/${id}/messages`)}
                      />
                      <Image
                        className="w-[48px] h-[48px] cursor-pointer"
                        src={phone_icon}
                        alt="phone icon"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

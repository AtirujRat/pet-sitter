import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

import BookingModal from "@/components/sitters/booking/BookingModal";
import PetCard from "@/components/owners/yourpet/PetCard";
import close from "@/public/assets/icons/icon-x.svg";
import {
  formatDateWithYear,
  formatTime,
  calculateDurationInHours,
} from "@/components/sitters/booking/timeUtils";

export default function ModalProfileOwner({
  booking,
  openModal,
  setOpenModal,
}) {
  const [data, setData] = useState();
  async function getBookingProfile() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/booking/${booking?.id}`
      );
      setData(res.data.data[0]);
      setLoading(false);
    } catch (e) {}
  }

  useEffect(() => {
    if (booking) getBookingProfile();
  }, [booking]);

  const duration = calculateDurationInHours(data?.start_time, data?.end_time);

  const startDate = formatDateWithYear(data?.start_time);
  const startTime = formatTime(data?.start_time);
  const endTime = formatTime(data?.end_time);
  const endDate = formatDateWithYear(data?.end_time);

  const transactionDate =
    new Date(data?.start_time).toLocaleDateString() ===
    new Date(data?.end_time).toLocaleDateString()
      ? startDate
      : `${startDate} - ${endDate}`;

  return (
    <BookingModal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="max-w-[800px] h-[800px] min-w-0 grow bg-ps-white rounded-2xl overflow-auto">
        <div className=" border-b border-ps-gray-200">
          <div className="px-10 py-6 text-h3 flex justify-between">
            {data?.owners?.full_name}
            <Image
              src={close}
              width={24}
              height={24}
              alt="close"
              className="cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
        <div className="sm:flex-row flex flex-col gap-10 p-10">
          <div className="flex flex-col gap-10 px-6">
            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Pet Owner Name</p>
              <p className="text-b2">{data?.owners?.full_name || "-"}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Pet(s)</p>
              <p className="text-b2">{data?.pets?.length}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-ps-gray-300 text-h4">Pet Detail</p>
              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                {data?.pets?.length === 0 ? (
                  <p className="text-b2">No pets available</p>
                ) : (
                  data?.pets?.map((pet, index) => (
                    <div key={index}>
                      <PetCard
                        styles="w-[207px] h-[236px] border border-ps-gray-200 shadow-none hover:-translate-y-0"
                        image={`${pet.pet_image_url}`}
                        name={`${pet.name}`}
                        type={`${pet.type}`}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Duration</p>
              <p className="text-b2">{duration !== 0 ? duration : "0"} hours</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Booking Date</p>
              <p className="text-b2">{`${startDate} | ${startTime} - ${endTime}`}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Total Paid</p>
              <p className="text-b2">{data?.price} THB</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Transaction Date</p>
              <p className="text-b2">{transactionDate}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Transaction No.</p>
              <p className="text-b2">-</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-ps-gray-300 text-h4">Additional Message</p>
              <p className="text-b2">{data?.message ? data?.message : "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </BookingModal>
  );
}

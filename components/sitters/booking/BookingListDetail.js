import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useSitters } from "@/context/SittersProvider";

import arrow from "@/public/assets/icons/icon-arrow.svg";
import iconEye from "@/public/assets/icons/icon-eye-orange.svg";
import petProfile from "@/public/assets/booking/pet-profile.svg";
import ownerProfile from "@/public/assets/booking/owner-profile.svg";
import close from "@/public/assets/icons/icon-x.svg";
import {
  formatDateWithYear,
  formatTime,
  calculateDurationInHours,
} from "./timeUtils";
import {
  WaitingForConfirm,
  WaitingForService,
  InService,
  Success,
  Canceled,
} from "./BookingStatus";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import PetCard from "@/components/owners/yourpet/PetCard";
import BookingModal from "./BookingModal";
import Loading from "@/components/Loading";

export default function BookingListDetail({ bookingId }) {
  const router = useRouter();
  const location = usePathname();
  const newLocation = location.split("/");
  newLocation.pop();
  const pathName = newLocation.join("/");

  const { loading, setLoading, refresh, setRefresh } = useSitters();

  const [booking, setBooking] = useState([]);
  const [openModalProfile, setOpenModalProifle] = useState(false);
  const [openModalPet, setOpenModalPet] = useState(false);
  const [openModalReject, setOpenModalReject] = useState(false);
  const [selectPet, setSelectPet] = useState({});

  const statusTypeComponents = {
    waitingforconfirm: WaitingForConfirm,
    waitingforservice: WaitingForService,
    inservice: InService,
    success: Success,
    canceled: Canceled,
  };

  const getBooking = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/booking/${bookingId}`
    );

    setBooking(res.data.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getBooking();
  }, [bookingId, refresh]);

  const duration = calculateDurationInHours(
    booking?.start_time,
    booking?.end_time
  );

  const startDate = formatDateWithYear(booking?.start_time);
  const startTime = formatTime(booking?.start_time);
  const endTime = formatTime(booking?.end_time);
  const endDate = formatDateWithYear(booking?.end_time);

  const transactionDate =
    new Date(booking?.start_time).toLocaleDateString() ===
    new Date(booking?.end_time).toLocaleDateString()
      ? startDate
      : `${startDate} - ${endDate}`;

  const handlerCloseModal = () => {
    setOpenModalProifle(false);
    setOpenModalPet(false);
    setOpenModalReject(false);
  };

  const getStatusComponent = (status) => {
    const statusKey = status?.replace(/\s+/g, "").toLowerCase();
    const StatusComponent = statusTypeComponents[statusKey];
    return StatusComponent ? <StatusComponent /> : status;
  };

  async function changeBookingStatus(updatedStatus) {
    await axios.patch(`http://localhost:3000/api/booking/${bookingId}`, {
      status: updatedStatus,
    });
    setRefresh(!refresh);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src={arrow}
            width={24}
            height={24}
            onClick={() => router.push(`${pathName}`)}
            className=" cursor-pointer"
          />
          <p className="text-h3 pl-1 pr-6">{booking?.owners?.full_name}</p>
          <p>{getStatusComponent(booking?.status)}</p>
        </div>
        <div className="flex gap-2">
          {booking.status === "Waiting for confirm" && (
            <>
              <ButtonOrangeLight
                id="reject booking"
                text="Reject Booking"
                width="w-[175px]"
                onClick={() => setOpenModalReject(true)}
              />
              <ButtonOrange
                id="confirm booking"
                text="Confirm Booking"
                width="w-[160px]"
                onClick={() => changeBookingStatus("Waiting for service")}
              />
            </>
          )}
          {booking.status === "Waiting for service" && (
            <ButtonOrange
              id="in service"
              text="In service"
              width="w-[160px]"
              onClick={() => changeBookingStatus("In service")}
            />
          )}
          {booking.status === "In service" && (
            <ButtonOrange
              id="Success"
              text="Success"
              width="w-[160px]"
              onClick={() => changeBookingStatus("Success")}
            />
          )}
        </div>
      </div>

      <div className="bg-ps-white rounded-2xl overflow-x-auto px-20 py-10 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-ps-gray-300 text-h3">Pet Owner Name</p>
          <div className="flex justify-between">
            <p className="text-b2">{booking?.owners?.full_name}</p>
            <p
              className="text-[16px] font-bold text-ps-orange-500 flex cursor-pointer"
              onClick={() => setOpenModalProifle(true)}
            >
              <Image src={iconEye} width={24} height={24} />
              View Profile
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-ps-gray-300 text-h4">Pet(s)</p>
          <p className="text-b2">{booking?.pets?.length}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-ps-gray-300 text-h4">Pet Detail</p>
          <div className="flex gap-3" onClick={() => setOpenModalPet(true)}>
            {booking?.pets?.length === 0 ? (
              <p className="text-b2">No pets available</p>
            ) : (
              booking?.pets?.map((pet, index) => (
                <div key={index} onClick={() => setSelectPet(pet)}>
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
          <p className="text-b2">{booking?.price} THB</p>
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
          <p className="text-b2">{booking?.message ? booking?.message : "-"}</p>
        </div>
      </div>

      {/* Modal Reject*/}
      <BookingModal
        openModal={openModalReject}
        setOpenModal={setOpenModalReject}
        closeModal={handlerCloseModal}
      >
        <div className="w-[400px] h-[208px] bg-ps-white rounded-2xl">
          <div className="border-b border-ps-gray-200 py-4 px-6 text-h4 flex justify-between">
            Reject Confirmation
            <Image
              src={close}
              width={24}
              height={24}
              alt="close"
              className="cursor-pointer"
              onClick={() => setOpenModalReject(false)}
            />
          </div>

          <div className="max-w[352px] w-full p-6 flex flex-col gap-6">
            <p className="w-full text-b2 text-ps-gray-400">
              Are you sure to reject this booking?
            </p>

            <div className="flex w-full justify-between">
              <ButtonOrangeLight
                id="cancel"
                text="Cancel"
                width="w-[120px]"
                onClick={() => setOpenModalReject(false)}
              />
              <ButtonOrange
                id="reject Confirm"
                text="Reject Booking"
                width="w-[160px]"
                onClick={() => {
                  changeBookingStatus("Canceled");
                  setOpenModalReject(false);
                }}
              />
            </div>
          </div>
        </div>
      </BookingModal>

      {/* Modal Profile*/}
      <BookingModal
        openModal={openModalProfile}
        setOpenModal={setOpenModalProifle}
        closeModal={handlerCloseModal}
      >
        <div className="w-[800px] h-[648px] bg-ps-white rounded-2xl">
          <div className=" border-b border-ps-gray-200">
            <div className="px-10 py-6 text-h3 flex justify-between">
              {booking?.owners?.full_name}
              <Image
                src={close}
                width={24}
                height={24}
                alt="close"
                className="cursor-pointer"
                onClick={() => setOpenModalProifle(false)}
              />
            </div>
          </div>
          <div className="flex gap-10 p-10">
            <div className="w-[240px] h-[240px] rounded-full">
              {booking.owners?.profile_image_url ? (
                <img
                  src={booking.owners?.profile_image_url}
                  alt={booking?.owners?.full_name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Image
                  src={ownerProfile}
                  alt="petProfile"
                  width={240}
                  height={240}
                />
              )}
            </div>
            <div className="flex flex-col gap-10 p-6">
              <div className="flex flex-col gap-1">
                <p className="text-ps-gray-300 text-h4">Pet Owner Name</p>
                <p className="text-[16px] font-normal">
                  {booking?.owners?.full_name || "-"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-ps-gray-300 text-h4">Email</p>
                <p className="text-[16px] font-normal">
                  {booking?.owners?.email || "-"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-ps-gray-300 text-h4">Phone</p>
                <p className="text-[16px] font-normal">
                  {booking?.owners?.full_name || "-"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-ps-gray-300 text-h4">ID Number</p>
                <p className="text-[16px] font-normal">
                  {booking?.owners?.id_number || "-"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-ps-gray-300 text-h4">Date of Birth</p>
                <p className="text-[16px] font-normal">
                  {booking?.owners?.date_of_birth || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BookingModal>

      {/* Modal Pet*/}
      <BookingModal
        openModal={openModalPet}
        setOpenModal={setOpenModalPet}
        closeModal={handlerCloseModal}
      >
        <div className="w-[800px] h-[552px] bg-ps-white rounded-2xl">
          <div className=" border-b border-ps-gray-200">
            <div className="px-10 py-6 text-h3 flex justify-between">
              {selectPet?.name}
              <Image
                src={close}
                width={24}
                height={24}
                alt="close"
                className="cursor-pointer"
                onClick={() => setOpenModalPet(false)}
              />
            </div>
          </div>
          <div className="flex gap-10 p-10 w-full">
            <div className="flex flex-col gap-4">
              <div className="bg-ps-orange-500 w-[240px] h-[240px] rounded-full relative shrink-0">
                {selectPet?.pet_image_url ? (
                  <img
                    src={selectPet?.pet_image_url}
                    alt={selectPet?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Image
                    src={petProfile}
                    alt="petProfile"
                    width={240}
                    height={240}
                  />
                )}
              </div>
              <div className="text-h4 text-center">{selectPet?.name}</div>
            </div>
            <div className="flex flex-col gap-10 p-6 w-full max-w-[440px]">
              <div className="flex gap-10">
                <div className="flex flex-col gap-1 max-w-[176px] w-full">
                  <p className="text-ps-gray-300 text-h4 w-full">Pet Type</p>
                  <p className="text-[16px] font-normal">
                    {selectPet?.type || "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-ps-gray-300 text-h4">Breed</p>
                  <p className="text-[16px] font-normal">
                    {selectPet?.breed || "-"}
                  </p>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col gap-1 max-w-[176px] w-full">
                  <p className="text-ps-gray-300 text-h4 w-full">Sex</p>
                  <p className="text-[16px] font-normal">
                    {selectPet?.sex || "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-ps-gray-300 text-h4">Age</p>
                  <p className="text-[16px] font-normal">
                    {selectPet?.age || "-"}
                  </p>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col gap-1 max-w-[176px] w-full">
                  <p className="text-ps-gray-300 text-h4 w-full">Color</p>
                  <p className="text-[16px] font-normal">
                    {selectPet?.color || "-"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-ps-gray-300 text-h4">Weight</p>
                  <p className="text-[16px] font-normal">
                    {selectPet?.weight || "-"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 max-w-[176px] w-full">
                <p className="text-ps-gray-300 text-h4 w-full">About</p>
                <p className="text-[16px] font-normal">
                  {selectPet?.description || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BookingModal>
    </div>
  );
}

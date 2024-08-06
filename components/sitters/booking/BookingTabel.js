import { useRouter } from "next/router";
import { useState } from "react";
import {
  formatDateWithoutYear,
  formatTime,
  calculateDurationInHours,
} from "./timeUtils";
import ModalProfileOwner from "@/components/admin/petsitter/modal/ModalProfileOwner";

export default function BookingTabel({
  bookings,
  getStatusComponent,
  id,
  modal = false,
}) {
  const router = useRouter();
  const [booking, setBooking] = useState();
  const [openModalProfile, setOpenModalProfile] = useState(false);

  const handleClick = (index) => {
    setOpenModalProfile(true);
    setBooking(bookings[index]);
  };

  return (
    <div className="bg-ps-white rounded-2xl overflow-x-auto mb-10 sm:mb-0 w-full">
      <table className="table">
        {/* head */}
        <thead className="h-[48px] bg-ps-black sticky top-0">
          <tr className="w-full">
            <th className="xl:w-[22%] w-[240px] text-b3 text-ps-white shrink-0">
              Pet Owner Name
            </th>
            <th className="xl:w-[15%] w-[120px] text-b3 text-ps-white shrink-0">
              Pet(s)
            </th>
            <th className="xl:w-[15%] w-[120px] text-b3 text-ps-white shrink-0">
              Duration
            </th>
            <th className="xl:w-[30%] w-[420px] text-b3 text-ps-white shrink-0">
              Booked Date
            </th>
            <th className="xl:w-[18%] w-[220px] text-b3 text-ps-white shrink-0">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings?.map((booking, index) => {
            const duration = calculateDurationInHours(
              booking?.start_time,
              booking?.end_time
            );
            const startDate = formatDateWithoutYear(booking?.start_time);
            const endDate =
              new Date(booking?.start_time).toLocaleDateString() ===
              new Date(booking?.end_time).toLocaleDateString()
                ? formatTime(booking?.end_time)
                : formatDateWithoutYear(booking?.end_time);
            return (
              <tr
                key={index}
                className="hover:bg-ps-orange-100 cursor-pointer text-nowrap"
                onClick={() => {
                  if (modal) {
                    handleClick(index);
                  } else router.push(`/sitters/booking/${booking?.id}`);
                }}
              >
                <td className="text-b2 py-6 flex items-center gap-2">
                  {booking?.status.toLowerCase() === "waiting for confirm" && (
                    <span className="w-2 h-2 bg-ps-orange-500 rounded-full"></span>
                  )}
                  {booking?.owners?.full_name}
                </td>
                <td className="text-b2 py-6">
                  {booking?.bookings_pets.length}
                </td>
                <td className="text-b2 py-6">{duration} hours</td>
                <td className="text-b2 py-6">{`${startDate} - ${endDate}`}</td>
                <td className="text-b2 py-6">
                  {getStatusComponent(booking?.status)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalProfileOwner
        booking={booking}
        openModal={openModalProfile}
        setOpenModal={setOpenModalProfile}
      />
    </div>
  );
}

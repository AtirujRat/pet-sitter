import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSitters } from "@/context/SittersProvider";
import { useRouter } from "next/router";

import {
  WaitingForConfirm,
  WaitingForService,
  InService,
  Success,
  Canceled,
} from "./BookingStatus";
import {
  formatDateWithoutYear,
  formatTime,
  calculateDurationInHours,
} from "./timeUtils";
import search from "@/public/assets/icons/icon-search.svg";

export default function BookingList({ id }) {
  const router = useRouter();
  const { setLoading, refresh, setRefresh } = useSitters();

  const [bookings, setBookings] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusTypeComponents = {
    waitingforconfirm: WaitingForConfirm,
    waitingforservice: WaitingForService,
    inservice: InService,
    success: Success,
    canceled: Canceled,
  };

  const debounce = (func, delay = 700) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const getBooking = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/sitters/${id}/booking?name=${searchName}&status=${selectedStatus}`
    );

    setBookings(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getBooking();
  }, [id, refresh]);

  useEffect(() => {
    const debouncedGetBooking = debounce(getBooking, 700);
    debouncedGetBooking();
  }, [searchName]);

  // Function to get status component
  const getStatusComponent = (status) => {
    const statusKey = status.replace(/\s+/g, "").toLowerCase();
    const StatusComponent = statusTypeComponents[statusKey];
    return StatusComponent ? <StatusComponent /> : status;
  };

  return (
    <div className="flex flex-col gap-6 h-screen">
      {/* Search */}
      <div className="flex justify-between ">
        <p className="text-h3">Booking List</p>
        <div className="flex gap-6">
          <div className="relative">
            <input
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
              type="text"
              placeholder="Search..."
              className="w-[240px] h-[48px] outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px] rounded-lg"
            />
            <Image
              src={search}
              alt="search"
              className="absolute right-0 bottom-0 -translate-y-3 -translate-x-4"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setRefresh(!refresh);
            }}
            className="w-[240px] h-[48px] outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px] rounded-lg"
          >
            <option selected value="">
              All status
            </option>
            <option value="Waiting for confirm">Waiting for confirm</option>
            <option value="Waiting for service">Waiting for service</option>
            <option value="In service">In service</option>
            <option value="Success">Success</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* booking list */}
      <div className="bg-ps-white rounded-2xl overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="h-[48px] bg-ps-black">
            <tr className="w-full">
              <th className="w-[22%] text-ps-white">Pet Owner Name</th>
              <th className="w-[15%] text-b3  text-ps-white">Pet(s)</th>
              <th className="w-[15%] text-b3  text-ps-white">Duration</th>
              <th className="w-[30%] text-ps-white">Booked Date</th>
              <th className="text-b3  text-ps-white">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => {
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
                  className="hover:bg-ps-orange-100 cursor-pointer"
                  onClick={() =>
                    router.push(`/sitters/${id}/booking/${booking?.id}`)
                  }
                >
                  <td className="text-b2 py-6 flex items-center gap-2">
                    {booking?.status.toLowerCase() ===
                      "waiting for confirm" && (
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
      </div>
    </div>
  );
}

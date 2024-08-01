import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSitters } from "@/context/SittersProvider";

import BookigTabel from "./BookingTabel";
import {
  WaitingForConfirm,
  WaitingForService,
  InService,
  Success,
  Canceled,
} from "./BookingStatus";
import search from "@/public/assets/icons/icon-search.svg";

export default function BookingList({ id }) {
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

  const getStatusComponent = (status) => {
    const statusKey = status.replace(/\s+/g, "").toLowerCase();
    const StatusComponent = statusTypeComponents[statusKey];
    return StatusComponent ? <StatusComponent /> : status;
  };

  return (
    <div className="flex flex-col gap-6 h-screen">
      {/* Search */}
      <div className="md:flex justify-between">
        <p className="md:text-h3 text-h4 pb-2 md:pb-0">Booking List</p>
        <div className="sm:flex-row flex flex-col sm:gap-6 gap-2">
          <div className="relative">
            <input
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
              type="text"
              placeholder="Search..."
              className="w-full sm:w-[240px] h-[48px] outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px] rounded-lg"
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
            className="w-full sm:w-[240px] h-[48px] outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px] rounded-lg"
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
      <BookigTabel
        bookings={bookings}
        getStatusComponent={getStatusComponent}
        id={id}
      />
    </div>
  );
}

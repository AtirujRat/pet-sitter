import axios from "axios";
import { useState, useEffect } from "react";

import BookingTabel from "@/components/sitters/booking/BookingTabel";
import {
  WaitingForConfirm,
  WaitingForService,
  InService,
  Success,
  Canceled,
} from "@/components/sitters/booking/BookingStatus";

export default function Booking({ sitter }) {
  const [bookings, setBookings] = useState([]);
  const searchName = "";
  const selectedStatus = "";

  async function getBooking() {
    const res = await axios.get(
      `/api/sitters/${sitter.id}/booking?name=${searchName}&status=${selectedStatus}`
    );

    setBookings(res.data.data);
  }

  useEffect(() => {
    getBooking();
  }, [sitter.id]);

  const statusTypeComponents = {
    waitingforconfirm: WaitingForConfirm,
    waitingforservice: WaitingForService,
    inservice: InService,
    success: Success,
    canceled: Canceled,
  };

  const getStatusComponent = (status) => {
    const statusKey = status.replace(/\s+/g, "").toLowerCase();
    const StatusComponent = statusTypeComponents[statusKey];
    return StatusComponent ? <StatusComponent /> : status;
  };
  return (
    <div>
      <BookingTabel
        bookings={bookings}
        getStatusComponent={getStatusComponent}
        id={sitter.id}
        modal
      />
    </div>
  );
}

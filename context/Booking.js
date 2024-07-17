import { createContext, useState } from "react";

export const BookingContext = createContext();

export function BookingProvider(props) {
  const [booking, setBooking] = useState();

  const addBookingHandle = (booking) => {
    setBooking(booking);
  };

  return (
    <BookingContext.Provider value={{ addBookingHandle, booking: booking }}>
      {props.children}
    </BookingContext.Provider>
  );
}

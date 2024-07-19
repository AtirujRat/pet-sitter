import { createContext, useState, useContext } from "react";

export const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);
export function BookingProvider(props) {
  const [booking, setBooking] = useState();
  const [stepBooking, setStepBooking] = useState(1);
  const [payment, setPayment] = useState("Credit Card");
  const [confirm, setConfirm] = useState(0);

  const addBookingHandle = (booking) => {
    setBooking(booking);
  };

  return (
    <BookingContext.Provider
      value={{
        addBookingHandle,
        booking: booking,
        payment,
        setPayment,
        stepBooking,
        setStepBooking,
        confirm,
        setConfirm,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

export const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);
export function BookingProvider(props) {
  const [booking, setBooking] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("myState");
      return savedState ? JSON.parse(savedState) : {};
    }
  });
  const [stepBooking, setStepBooking] = useState("your_pet");
  const [payment, setPayment] = useState("Credit Card");
  const [confirm, setConfirm] = useState(0);
  const [select, setSelect] = useState({});
  const [selectedPets, setSelectedPets] = useState([]);
  const [petname, setPetname] = useState([]);
  const [petId, setPetId] = useState([]);

  function handleBookingSuccess() {
    setStepBooking("your_pet");
    setPayment("Credit Card");
    setConfirm(0);
    setSelect({});
    setSelectedPets([]);
    setPetname([]);
  }
  async function handleBooking(data) {
    console.log(data);
    try {
      await axios.post("/api/owner/booking", data);
    } catch (error) {
      console.log("error");
    }
  }

  function addBookingHandle(booking) {
    setBooking({ ...booking, owner_pet: petname, pet_id: petId });
  }

  function handlePetSelect(event) {
    const { value, checked } = event.target;
    setSelectedPets((prevSelectedPets) => {
      let updatedSelectedPets;
      setSelect({ ...select, [value]: checked });
      if (checked) {
        updatedSelectedPets = [...prevSelectedPets, value];
      } else {
        updatedSelectedPets = prevSelectedPets.filter((pet) => pet !== value);
      }
      return updatedSelectedPets;
    });
  }

  useEffect(() => {
    if (booking) {
      localStorage.setItem("myState", JSON.stringify(booking));
    }
  }, [booking]);

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
        handlePetSelect,
        select,
        setSelect,
        setPetname,
        setPetId,
        handleBooking,
        handleBookingSuccess,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

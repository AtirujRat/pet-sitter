import { createContext, useState, useEffect, useContext } from "react";
import { useSitters } from "./SittersProvider";

const BookingContext = createContext();
export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider(props) {
  const [booking, setBooking] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("myState");
      return savedState ? JSON.parse(savedState) : {};
    }
  });
  const [stepBooking, setStepBooking] = useState("your_pet");
  const [payment, setPayment] = useState("Credit Card");
  const [confirm, setConfirm] = useState("booking");
  const [select, setSelect] = useState({});
  const [selectedPets, setSelectedPets] = useState([]);
  const [petname, setPetname] = useState([]);
  const [petId, setPetId] = useState([]);
  const [onselectPet, setOnselectPet] = useState(false);
  const { setIsBookingModalOpen } = useSitters();

  function handleBookingSuccess() {
    setTimeout(() => {
      setStepBooking("your_pet");
      setPayment("Credit Card");
      setSelect({});
      setSelectedPets([]);
      setPetname([]);
      setPetId([]);
      setIsBookingModalOpen(false);
    }, 2000);
  }

  function addBookingHandle(booking) {
    setConfirm("booking");
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
        handleBookingSuccess,
        onselectPet,
        setOnselectPet,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

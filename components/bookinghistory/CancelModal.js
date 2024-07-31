import React from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import { ButtonOrange, ButtonOrangeLight } from "../buttons/OrangeButtons";
import axios from "axios";

export default function CancelModal(props) {
  async function cancelBookingHandle() {
    try {
      await axios.patch(`/api/booking/${props.bookingList[props.index].id}`, {
        status: "Canceled",
      });
      props.closeModal();
    } catch {
      alert("Could not cancel booking because database issue");
    }
  }

  return (
    <div className="w-[400px] h-[208px] bg-ps-white rounded-2xl">
      <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[16px] px-[24px]">
        <h1 className="text-h4 text-ps-black">Cancel Booking</h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex flex-col gap-[24px] p-[24px]">
        <p className="text-b2 text-ps-gray-400">
          Are you sure to cancel this Booking?
        </p>
        <div className="flex justify-between">
          <ButtonOrangeLight onClick={() => props.closeModal()} text="Cancel" />
          <ButtonOrange
            onClick={() => cancelBookingHandle()}
            text="Cancel Booking"
          />
        </div>
      </div>
    </div>
  );
}

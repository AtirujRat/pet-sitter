import React from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import GetOnlyDate from "@/hook/useGetOnlyDate";
import GetOnlyTime from "@/hook/useGetOnlyTime";
import CalculateDutation from "@/hook/useCalculatedDuration";

export default function BookingDetailModal(props) {
  const BOOKING_STATUS = {
    Waiting_for_confirm: "ps-pink-500",
    Waiting_for_service: "ps-yellow-200",
    In_service: "ps-blue-500",
    Success: "ps-green-500",
    Canceled: "ps-red",
  };
  return (
    <div className="w-[100vw] h-[100vh] lg:w-[632px] lg:h-[564px] bg-ps-white lg:rounded-2xl">
      <div className="flex justify-between py-[24px] px-[40px] border-b-[1px] border-ps-gray-200">
        <h1 className="text-h3 text-ps-gray-600">Booking Detail</h1>
        <Image
          onClick={() => props.closeModal()}
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
        />
      </div>
      <div className="flex flex-col gap-[24px] p-[40px]">
        <li
          className={`text-${
            BOOKING_STATUS[
              props.bookingList[props.index].status.replace(/ /g, "_")
            ]
          } text-b2`}
        >
          {props.bookingList[props.index].status}
        </li>
        <div>
          <p className="text-b2 text-ps-gray-300">
            Transaction date:{" "}
            <GetOnlyDate time={props.bookingList[props.index].last_updated} />
          </p>
          <p className="text-b2 text-ps-gray-300">
            Transaction No. : {props.bookingList[props.index].transaction_id}
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-b3 text-ps-gray-400 ">Pet Sitter:</h1>

          <div className="flex justify-between items-center">
            <p className="text-b2 text-ps-gray-600">
              {props.bookingList[props.index].sitters.trade_name} By{" "}
              {props.bookingList[props.index].sitters.full_name}
            </p>
            <button className="text-ps-orange-500 text-[1rem] font-[700]">
              @ View Map
            </button>
          </div>
        </div>

        <div className="flex gap-[40px]">
          <div>
            <h1 className="text-b3 text-ps-gray-400">Date & Time:</h1>
            <div className="flex items-center gap-[12px]">
              <span className="text-b3 2xl:text-b2 text-ps-gray-600">
                <GetOnlyDate time={props.bookingList[props.index].start_time} />
              </span>
              <span className="text-b2 text-ps-gray-400">|</span>
              <span className="text-b3 2xl:text-b2 text-ps-gray-600">
                <GetOnlyTime time={props.bookingList[props.index].start_time} />
                - <GetOnlyTime time={props.bookingList[props.index].end_time} />
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-b3 text-ps-gray-400">Duration:</h1>
            <p className="text-b2 text-ps-gray-600">
              <CalculateDutation
                start_time={props.bookingList[props.index].start_time}
                end_time={props.bookingList[props.index].end_time}
              />
            </p>
          </div>
        </div>
        <div className="border-b-[1px] border-ps-gray-200 pb-[20px]">
          <h1 className="text-b3 text-ps-gray-400">Pet:</h1>
          <p className="text-b2 text-ps-gray-600">
            {props.bookingList[props.index].pets.map((pet, index) => (
              <span key={index}>
                {pet.name}
                {index < props.bookingList[props.index].pets.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-b2">Total</h1>
          <h1 className="text-b2">
            {props.bookingList[props.index].price} THB
          </h1>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import date_icon from "@/public/assets/booking/date-icon.svg";
import time_icon from "@/public/assets/booking/time.svg";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";

import axios from "axios";

const timeSchedule = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
];

function convertToDate(time) {
  const [timeStr, modifier] = time.split(" ");
  let [hours, minutes] = timeStr.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  return new Date(year, month, date, hours, minutes);
}

export default function ChangeDateModal(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [toggleStartTime, setToggleStartTime] = useState(false);
  const [toggleEndTime, setToggleEndTime] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const validateBookingDate = (inputDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(inputDate);

    if (selectedDate < today) {
      setDateError("Selected date cannot be in the past.");
    } else {
      setDateError(null);
    }
  };

  function validateTimeSchedule(value1, value2, date) {
    const now = new Date();
    const futureTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    const today = new Date();
    const time1 = convertToDate(value1);
    const time2 = convertToDate(value2);
    const selectedDate = new Date(date);

    if (selectedDate >= today) {
      if (time1 >= time2) {
        setTimeError("Invalid date");
      } else if (time1 < time2) {
        setTimeError(null);
      }
      return;
    }

    if (time1 < futureTime) {
      setTimeError("At least 6 hours in advance.");
      return;
    }

    if (time1 >= time2) {
      setTimeError("Invalid date");
      return;
    }

    setTimeError(null);
  }

  useEffect(() => {
    validateTimeSchedule(startTime, endTime, dateInput);
  }, [startTime, endTime, dateInput]);

  function onChangeDateHandle(e) {
    setDateInput(e.target.value);
    if (e.target.value !== "") {
      setDateError(null);
    }
    validateBookingDate(e.target.value);
  }

  async function changeDateHandle(e) {
    e.preventDefault();

    if (startTime === "" || endTime === "") {
      setTimeError("Require");
    }
    if (dateInput === "") {
      setDateError("Require");
    }

    if (timeError === null && dateError === null) {
      try {
        const changeDate = await axios.put(
          `/api/booking/booking/?id=${props.bookingList[props.index].id}`,
          {
            start_time: dateInput + " " + startTime,
            end_time: dateInput + " " + endTime,
          }
        );
        if (changeDate) {
          props.setAlertText("Date has been changed.");
          props.setRefresh((prev) => !prev);
          props.closeModal();
          props.setConnection(true);
        }
      } catch {
        alert("Could not changedate");
      }
    }
  }

  return (
    <form
      onSubmit={changeDateHandle}
      className=" w-[100vw] h-[100vh] sm:w-[560px] sm:h-[438px] bg-ps-white sm:rounded-2xl "
    >
      <div className="flex justify-between py-[24px] px-[40px] border-b-[1px] border-ps-gray-200 ">
        <h1 className="text-ps-gray-600 text-h3 ">Booking</h1>
        <Image
          className="cursor-pointer"
          src={cross_icon}
          alt="cross icon"
          onClick={() => props.closeModal()}
        />
      </div>

      <div className="flex flex-col gap-[24px] text-b1 p-[40px]">
        <h1 className="text-ps-gray-600 text-b3 sm:text-b1">
          Select date and time you want to schedule the service.
        </h1>
        <div className="flex items-center gap-[16px]">
          <div className="relative flex w-[24px] h-[24px]  justify-center">
            <Image
              className="absolute w-[24px] h-[24px] "
              src={date_icon}
              alt="date icon"
            />
            <input
              className="relative text-[30px] rotate-[180deg] left-[100px] opacity-0"
              type="date"
              name="booking_date"
              onChange={onChangeDateHandle}
              value={dateInput}
            />
          </div>
          <div className="w-full relative">
            <div
              className="w-full flex p-[10px] items-center h-[48px] rounded-lg border-[1px] border-ps-gray-200"
              disabled={true}
            >
              {dateInput}
            </div>
            <div className="absolute top-[100%]  text-ps-red text-b3">
              {dateError}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[16px]">
          <Image
            className="w-[24px] h-[24px]"
            src={time_icon}
            alt="time icon"
          />
          <div
            onClick={() => setToggleStartTime((prev) => !prev)}
            className="relative w-[208px] flex justify-start items-center h-[48px] rounded-lg border-[1px] border-ps-gray-200 cursor-pointer"
          >
            <h1 className="p-[12px] text-b3 sm:text-b2"> {startTime}</h1>
            {toggleStartTime && (
              <div className="absolute top-[100%] w-full h-[220px] bg-ps-white overflow-x-auto rounded-xl list-none shadow-[4px_2px_12px_2px_#00000029] mt-[5px] py-[12px]">
                {timeSchedule.map((time, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setStartTime(time)}
                      className="text-b3 pl-[8px] sm:text-b2 py-[12px] sm:px-[24px] hover:bg-ps-gray-100"
                    >
                      {time}
                    </li>
                  );
                })}
              </div>
            )}
            <div className="absolute top-[100%]  text-ps-red text-b3">
              {timeError}
            </div>
          </div>
          <span className="text-ps-gray-300">-</span>
          <div
            onClick={() => setToggleEndTime((prev) => !prev)}
            className="relative w-[208px] flex justify-start items-center h-[48px] rounded-lg border-[1px] border-ps-gray-200 cursor-pointer"
          >
            <h1 className="p-[12px] text-b3 sm:text-b2"> {endTime}</h1>
            {toggleEndTime && (
              <div className="absolute top-[100%] w-full h-[220px] bg-ps-white overflow-x-auto rounded-xl list-none shadow-[4px_2px_12px_2px_#00000029] mt-[5px] py-[12px]">
                {timeSchedule.map((time, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setEndTime(time)}
                      className="text-b3 pl-[8px] sm:text-b2 py-[12px] sm:px-[24px] hover:bg-ps-gray-100"
                    >
                      {time}
                    </li>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-ps-orange-500 text-ps-white text-b2 w-full rounded-full py-[12px] px-[24px] mt-[30px]"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

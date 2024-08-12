import React, { useEffect, useState } from "react";
import date_icon from "@/public/assets/booking/date-icon.svg";
import time_icon from "@/public/assets/booking/time.svg";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import { useBooking } from "@/context/Booking";
import { useOwners } from "@/context/Owners";
import { useRouter } from "next/router";
import axios from "axios";
import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

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

export default function BookingModal(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [toggleStartTime, setToggleStartTime] = useState(false);
  const [toggleEndTime, setToggleEndTime] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let formatter = useDateFormatter({ dateStyle: "full" });
  const router = useRouter();
  const id = router.query.id;
  const { addBookingHandle, setStepBooking } = useBooking();
  const { getUserAuth, setUser } = useOwners();

  //---Validations---
  // const validateBookingDate = (inputDate) => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const selectedDate = new Date(inputDate);

  //   if (selectedDate < today) {
  //     setDateError("Selected date cannot be in the past.");
  //   } else {
  //     setDateError(null);
  //   }
  // };

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
      setTimeError("Invalid time");
      return;
    }

    setTimeError(null);
  }

  useEffect(() => {
    validateTimeSchedule(startTime, endTime, dateInput);
  }, [startTime, endTime, dateInput]);

  async function createBooking(e) {
    e.preventDefault();

    if (startTime === "" || endTime === "") {
      setTimeError("Require");
    }
    if (dateInput === "") {
      setTimeError("Require");
    }

    if (timeError === null && dateError === null) {
      try {
        const ownerEmail = await getUserAuth();

        const ownerData = await axios.get(
          `/api/owner/${ownerEmail.email}/queryowner`
        );
        if (ownerEmail) {
          setUser(ownerData.data[0]);
          addBookingHandle({
            owner_id: ownerData.data[0].id,
            sitter_id: id,
            start_time: dateInput + " " + startTime,
            end_time: dateInput + " " + endTime,
            status: "Waiting for confirm",
            creted_at: new Date(),
            last_updated: new Date(),
            price: "",
          });
        }

        setTimeout(() => {
          setStepBooking("your_pet");
          router.push(`/sitters/${id}/booking/create`);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  }

  //---Date input functions---

  function handleDateChange(date) {
    if (date) {
      setDateInput(date.toString());
      setDateError(null);
    }
  }

  function CalendarIcon() {
    return (
      <Image className="w-[24px] h-[24px]" src={date_icon} alt="select date" />
    );
  }

  function DateLabel() {
    return <div className="w-[24px] h-[24px]" alt="select date"></div>;
  }

  return (
    <form
      onSubmit={createBooking}
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
        <div className="flex flex-col relative">
          <div className="date-input w-full flex gap-4">
            <DatePicker
              variant="bordered"
              onChange={handleDateChange}
              labelPlacement="outside-left"
              label={<DateLabel />}
              selectorIcon={<CalendarIcon />}
              color="primary"
              size="lg"
              radius="sm"
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              classNames={{
                selectorButton: "absolute -left-[46px]",
              }}
              dateInputClassNames={{
                label: "mr-2",
                inputWrapper:
                  "shadow-none border border-[#DCDFED] hover:border-[#AEB1C3] focus:border-[#AEB1C3]",
                errorMessage: "text-[#EA1010] text-[14px]",
                input: "text-[16px] font-medium",
              }}
            />
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
            className="relative w-[208px] flex justify-start items-center h-[48px] rounded-lg border border-ps-gray-200 hover:border-[#AEB1C3] cursor-pointer"
          >
            <h1
              className={`p-[12px] text-b3 sm:text-b2 ${
                !startTime ? "text-ps-gray-400" : ""
              }`}
            >
              {startTime || "Start time"}
            </h1>
            {toggleStartTime && (
              <div className="absolute top-[100%] w-full h-[220px] bg-ps-white overflow-x-auto rounded-xl list-none shadow-[4px_2px_12px_2px_#00000029] mt-[5px] py-[12px] z-10">
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
            <div className="absolute top-[113%] left-1 text-ps-red text-b3">
              {timeError}
            </div>
          </div>
          <span className="text-ps-gray-300">-</span>
          <div
            onClick={() => setToggleEndTime((prev) => !prev)}
            className="relative w-[208px] flex justify-start items-center h-[48px] rounded-lg border border-ps-gray-200 hover:border-[#AEB1C3] cursor-pointer"
          >
            <h1
              className={`p-[12px] text-b3 sm:text-b2 ${
                !endTime ? "text-ps-gray-400" : ""
              }`}
            >
              {endTime || "End time"}
            </h1>
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
          disabled={isSubmitting}
          className="bg-ps-orange-500 text-ps-white text-b2 w-full rounded-full py-[12px] px-[24px] mt-6 disabled:bg-ps-gray-300"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

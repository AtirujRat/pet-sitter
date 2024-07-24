import React, { useEffect, useState } from "react";
import date_icon from "@/public/assets/booking/date-icon.svg";
import time_icon from "@/public/assets/booking/time.svg";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import { Formik, Field, Form } from "formik";

import { useBooking } from "@/context/Booking";
import { useOwners } from "@/context/Owners";
import { useRouter } from "next/router";
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
  "00:00 PM",
  "00:30 PM",
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

function validateCalendar(value) {
  let error;
  const selectedDate = new Date(value);
  const today = new Date();
  if (today >= selectedDate) {
    error = "Date must be tomorrow";
  } else if (value === "") {
    error = "Require";
  }

  return error;
}

function convertToDate(time) {
  const [timeStr, modifier] = time.split(" ");
  let [hours, minutes] = timeStr.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return new Date(1970, 0, 1, hours, minutes);
}

function validateTimeSchedule(value1, value2) {
  if (value1 === "" || value2 === "") {
    return "Require";
  }

  const time1 = convertToDate(value1);
  const time2 = convertToDate(value2);

  if (time1 >= time2) {
    return "Invalid time";
  }

  return "";
}

export default function BookingModal(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [toggleStartTime, setToggleStartTime] = useState(false);
  const [toggleEndTime, setToggleEndTime] = useState(false);
  const [timeError, setTimeError] = useState(null);

  const router = useRouter();
  const id = router.query.id;
  const { addBookingHandle, setStepBooking } = useBooking();
  const { getUserAuth } = useOwners();

  useEffect(() => {
    if (startTime === "" || endTime === "") {
      return;
    } else {
      setTimeError(validateTimeSchedule(startTime, endTime));
    }
  }, [startTime, endTime]);

  async function createBooking(formdata) {
    const ownerEmail = await getUserAuth();

    const ownerData = await axios.post(`/api/owner/queryowner`, {
      email: ownerEmail.email,
    });

    if (startTime === "" || endTime === "") {
      setTimeError("Require");
      return;
    } else if (timeError) {
      return;
    }
    if (ownerEmail) {
      addBookingHandle({
        owner_id: ownerData.data[0].id,
        sitter_id: "",
        start_time: formdata.booking_date + " " + startTime,
        end_time: formdata.booking_date + " " + endTime,
        status: "Waiting for confirm",
        creted_at: new Date(),
        last_updated: new Date(),
        price: "",
      });
    }
  }

  return (
    <Formik
      initialValues={{ booking_date: "" }}
      onSubmit={(values, { setSubmitting }) => {
        createBooking(values);
        setStepBooking("your_pet");
        router.push(`/sitters/${id}/booking/create`);
      }}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className=" w-[100vw] h-[100vh] sm:w-[560px] sm:h-[438px] bg-ps-white sm:rounded-2xl ">
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
                  className="absolute w-[24px] h-[24px]"
                  src={date_icon}
                  alt="date icon"
                />
                <Field
                  className="w-full h-full opacity-0 z-15"
                  type="date"
                  name="booking_date"
                  validate={validateCalendar}
                />
              </div>
              <div className="w-full relative">
                <input
                  className="w-full h-[48px] rounded-lg border-[1px] border-ps-gray-200"
                  value={values.booking_date}
                  disabled={true}
                />
                {errors.booking_date && touched.booking_date && (
                  <div className="absolute top-[100%] text-ps-red text-b3">
                    {errors.booking_date}
                  </div>
                )}
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
        </Form>
      )}
    </Formik>
  );
}

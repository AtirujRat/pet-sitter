import React, { useEffect, useState } from "react";
import date_icon from "@/public/assets/booking/date-icon.svg";
import time_icon from "@/public/assets/booking/time.svg";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import { Formik, Field, Form } from "formik";
import { supabase } from "@/utils/supabase";

const timeSchedule = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 AM",
  "12:30 AM",
  "13:00 AM",
  "13:30 AM",
  "14:00 AM",
  "14:30 AM",
  "15:00 AM",
  "15:30 AM",
  "16:00 AM",
  "16:30 AM",
  "17:00 AM",
  "17:30 AM",
  "18:00 AM",
];

const validateCalendar = (value) => {
  let error;
  const selectedDate = new Date(value);
  const today = new Date();
  if (today >= selectedDate) {
    error = "Date must be tomorrow";
  } else if (value === "") {
    error = "Require";
  }

  return error;
};

const validateTimeSchedule = (value1, value2) => {
  let error;
  if (value1 >= value2) {
    error = "Invalid time";
  } else if (value1 === "" || value2 === "") {
    error = "Require";
  }

  return error;
};

const BookingModal = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [toggleStartTime, setToggleStartTime] = useState(false);
  const [toggleEndTime, setToggleEndTime] = useState(false);
  const [timeError, setTimeError] = useState(null);

  useEffect(() => {
    if (startTime === "" || endTime === "") {
      return;
    } else {
      setTimeError(validateTimeSchedule(startTime, endTime));
    }
  }, [startTime, endTime]);

  const createBooking = async (formdata) => {
    if (startTime === "" || endTime === "") {
      setTimeError("Require");
      return;
    } else if (timeError) {
      return;
    }
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          owner_id: "",
          sitter_id: "",
          start_time: formdata.booking_date + " " + startTime,
          end_time: formdata.booking_date + " " + endTime,
          status: "",
          created_at: new Date(),
          last_updated: new Date(),
          price: 600,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }

    console.log(data);
  };

  return (
    <Formik
      initialValues={{ booking_date: "" }}
      onSubmit={(values, { setSubmitting }) => {
        createBooking(values);
      }}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className=" w-[100vw] h-[100vh] sm:w-[560px] sm:h-[438px] bg-ps-white sm:rounded-2xl ">
          <div className="flex justify-between py-[24px] px-[40px] border-b-[1px] border-ps-gray-200 ">
            <h1 className="text-ps-gray-600 text-h3 ">Booking</h1>
            <button className="text-ps-gray-600">
              <Image src={cross_icon} alt="cross icon" />
            </button>
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
};

export default BookingModal;

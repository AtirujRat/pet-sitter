import SideBarOwners from "@/components/owners/SideBarOwners";
import Image from "next/image";
import React, { useEffect } from "react";
import logo_gmail from "@/public/assets/authentication/logo-gmail.svg";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import phone_icon from "@/public/assets/booking/phone.svg";
import pen_icon from "@/public/assets/booking/pen.svg";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";

const BOOKING_STATUS = {
  waiting: "ps-blue-500",
  in_service: "ps-green-500",
  success: "ps-pink-500",
};

const BookingHistory = () => {
  const params = useParams();

  const getBookingHistory = async () => {
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("id");
  };

  useEffect(() => {}, []);

  return (
    <div className="flex gap-5 flex-col justify-center lg:flex-row  max-w-screen-xl mx-auto mt-4">
      <SideBarOwners />
      <div className="w-full lg:w-[965px] h-fit shadow-md rounded-2xl p-[10px] lg:p-[40px] flex flex-col items-start gap-[40px] lg:gap-[45px]">
        <h1 className="text-h3">Booking History</h1>
        {/* //Booking list */}
        <div className="w-full h-fit rounded-2xl border-[1px] border-ps-gray-200 p-[24px]">
          <div className="flex flex-col min-[600px]:flex-row justify-between h-fit  pb-[16px] gap-[16px] border-b-[1px] border-ps-gray-200">
            <div className="flex items-center   gap-[16px] ">
              <Image
                className="w-[64px] h-[64px] rounded-full"
                src={logo_gmail}
                alt="Owner profile"
              />
              <div>
                <h1 className="text-h3">Happy House!</h1>
                <h1 className="text-b1">By Jane Maison</h1>
              </div>
            </div>
            <div className="flex flex-col items-start min-[600px]:items-end gap-[12px]">
              <h1 className="text-b3 text-ps-gray-300">
                Transaction date: Tue, 16 Aug 2023
              </h1>
              <li>Waiting for confirm</li>
            </div>
          </div>

          <div className="flex flex-col  md:flex-row gap-[10px] sm:gap-[15px] items-center justify-between mt-[16px] ">
            <div className=" w-full md:w-[50%]">
              <h1 className="text-ps-gray-400 text-b3">Date & Time:</h1>
              <div className="flex items-center gap-[12px]">
                <span className="text-b3 2xl:text-b2 text-ps-gray-600">
                  25 Aug, 2023
                </span>
                <span className="text-b2 text-ps-gray-400">|</span>
                <span className="text-b3 2xl:text-b2 text-ps-gray-600">
                  7 AM - 10 AM
                </span>
                <button className="text-b3 2xl:text-b2 font-[700] text-ps-orange-500 flex gap-1">
                  <Image className="w-[22px] h-[22px]" src={pen_icon} /> Change
                </button>
              </div>
            </div>
            <div className="hidden md:block bg-ps-gray-200 w-[1px] h-[35px] mx-[36px]"></div>

            <div className="flex flex-col sm:flex-row w-full md:w-[50%] gap-[10px]">
              <div className="flex items-center w-[50%]">
                <div>
                  <h1 className="text-ps-gray-400 text-b3">Duration:</h1>
                  <h1 className="text-ps-gray-600 text-b3 2xl:text-b2">
                    3 Hours
                  </h1>
                </div>
              </div>

              <div className="flex items-center w-[50%]">
                <div className="hidden md:block bg-ps-gray-200 w-[1px] h-[35px] mr-10"></div>
                <div>
                  <h1 className="text-ps-gray-400 text-b3">Pet:</h1>
                  <p className="text-ps-gray-600 text-b3 2xl:text-b2">
                    Bubba, Daisy
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-fit sm:h-[80px] flex items-start sm:items-center flex-col sm:flex-row justify-between bg-ps-gray-100 mt-[36px] rounded-2xl p-[16px] gap-[16px]">
            <p className="text-b3 text-ps-gray-400">
              Waiting Pet Sitter for confirm booking
            </p>
            <div className="flex items-center gap-5">
              <ButtonOrange
                text="Send Message"
                width="w-[156px] h-[48px] text-b3"
              />
              <Image
                className="w-[48px] h-[48px] cursor-pointer"
                src={phone_icon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;

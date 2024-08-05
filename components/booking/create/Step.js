import { useBooking } from "@/context/Booking";
import { useEffect } from "react";
export default function Step() {
  const { stepBooking } = useBooking();
  return (
    <div className="p-4 lg:p-6 w-full flex justify-between lg:justify-center lg:gap-16 shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)]">
      <div className="flex gap-1.5 lg:gap-3 items-center">
        <h3
          className={
            stepBooking === "your_pet"
              ? "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-white border-none rounded-full bg-ps-orange-500 flex justify-center items-center"
              : "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-orange-500 border-none rounded-full bg-ps-black flex justify-center items-center"
          }
        >
          1
        </h3>
        <p
          className={
            stepBooking === "your_pet"
              ? "text-sm lg:text-b1 text-ps-orange-500"
              : "text-sm lg:text-b1 text-ps-black"
          }
        >
          Your<span className="text-ps-white">a</span>pet
        </p>
      </div>

      <div className="flex gap-1.5 lg:gap-3 items-center">
        <h3
          className={
            stepBooking === "information"
              ? "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-white border-none rounded-full bg-ps-orange-500 flex justify-center items-center"
              : stepBooking === "payment"
              ? "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-orange-500 border-none rounded-full bg-ps-black flex justify-center items-center"
              : "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-gray-400 border-none rounded-full bg-ps-gray-100 flex justify-center items-center"
          }
        >
          2
        </h3>
        <p
          className={
            stepBooking === "information"
              ? "text-sm lg:text-b1 text-ps-orange-500"
              : stepBooking === "payment"
              ? "text-sm lg:text-b1 text-ps-black"
              : "text-sm lg:text-b1 text-ps-gray-400"
          }
        >
          Infomation
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <h3
          className={
            stepBooking === "payment"
              ? "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-white border-none rounded-full bg-ps-orange-500 flex justify-center items-center"
              : "w-7 lg:w-12 h-7 lg:h-12 py-3 text-h3 text-ps-gray-400 border-none rounded-full bg-ps-gray-100 flex justify-center items-center"
          }
        >
          3
        </h3>
        <p
          className={
            stepBooking === 3
              ? "text-sm lg:text-b1 text-ps-orange-500"
              : "text-sm lg:text-b1 text-ps-gray-400"
          }
        >
          Payment
        </p>
      </div>
    </div>
  );
}

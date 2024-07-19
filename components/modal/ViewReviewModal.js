import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import { ButtonOrange, ButtonOrangeLight } from "../buttons/OrangeButtons";
import { useState } from "react";

export default function ViewReviewModal({ isOpen, onCancel, onSubmit }) {
  if (!isOpen) return null;

  const getRandomRating = () => Math.floor(Math.random() * 5) + 1; // mock up random star (can delete while have api)
  const [rating, setRating] = useState(getRandomRating());

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Modal Backdrop */}
      <div className="absolute left-0 top-0 w-full h-full bg-ps-black opacity-70"></div>

      {/* Modal Box */}
      <div className="absolute max-md:bottom-0 max-md:w-full w-[800px] h-[600px] max-md:h-[548px] bg-ps-white rounded-2xl max-md:rounded-b-none z-40 flex flex-col py-2">
        {/* Modal title */}
        <div className="flex justify-between w-full border-b-[1px] border-b-ps-gray-200 pb-4 items-center px-6 py-4">
          <h3 className="text-h3 text-ps-gray-600 max-md:text-h4">
            <span className="max-md:hidden">Your </span> Rating{" "}
            <span className="hidden max-md:inline">& </span>
            <span className="max-md:hidden">and </span> Review
          </h3>
          <Image
            src="/assets/icons/icon-x.svg"
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={onCancel}
          />
        </div>
        {/* Modal Body */}
        <div className="w-full  h-full p-6 flex flex-col items-center justify-between gap-3">
          <div className="mx-auto border-b-[1px] w-[90%] min-w-[243px]  min-h-[128px] h-fit border-b-ps-gray-200">
            <div className="mx-auto flex flex-row gap-3 max-sm:justify-between py-3">
              <div className="flex flex-row items-center w-fit gap-3">
                <Image
                  src="/assets/navbar/profile.svg"
                  className="rounded-full max-sm:w-[36px] max-sm:h-[36px]"
                  width={56}
                  height={56}
                />
                <div>
                  <p className="text-b1 text-ps-black truncate w-36">
                    John Wick
                  </p>
                  <p className="text-b3 text-ps-gray-400">Tue, 13 Apr 2023</p>
                </div>
              </div>
              <div className="flex  flex-col justify-around items-start">
                <div className="flex items-center gap-2 max-md:gap-1">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <Image
                      key={index}
                      src={
                        index <= rating
                          ? "/assets/icons/icon-star-green.svg"
                          : "/assets/icons/icon-star-gray.svg"
                      }
                      width={20}
                      height={20}
                      className="cursor-pointer star-icon transition-transform transform-gpu hover:scale-110 max-sm:w-[12px]"
                      name="rating"
                    />
                  ))}
                </div>
                <div className="truncate max-w-96 max-sm:hidden">
                  Thanks for I Som
                </div>
              </div>
            </div>
            <div className="sm:hidden">Thanks for I Som</div>
          </div>
          <ButtonOrangeLight text="View Pet Sitter" width="w-fit" />
        </div>
      </div>
    </div>
  );
}

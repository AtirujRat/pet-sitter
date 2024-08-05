import Image from "next/image";
import React, { useEffect, useState } from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import green_star from "@/public/assets/review/green-star.svg";
import gray_star from "@/public/assets/review/gray-star.svg";
import { Form, Formik, Field } from "formik";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import axios from "axios";

export default function ReviewModal(props) {
  const [rating, setRating] = useState(0);
  const [isRatingEqual0, setIsRatingEqual0] = useState(null);
  const [error, setError] = useState(null);

  function validateDescription(value) {
    let error;
    if (!value && rating === 0) {
      error = "Required";
      setIsRatingEqual0("Rating must greater than 1");
    } else if (!value) {
      error = "Required";
    }

    return error;
  }

  async function submitRatingAndReviewHandle(formData) {
    try {
      const submitReview = await axios.post("/api/reviews/reviews", {
        booking_id: props.bookingList[props.index].id,
        rating: rating,
        description: formData.description,
        status: "pending",
      });
      if (submitReview) {
        props.closeModal();
        props.setRefresh((prev) => !prev);
      }
      setError(null);
    } catch (error) {
      setError("Could not sent the report because database issue");
    }
  }

  useEffect(() => {
    if (rating < 0) {
      setIsRatingEqual0("Rating must greater than 1");
    } else {
      setIsRatingEqual0(null);
    }
  }, [rating]);

  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        submitRatingAndReviewHandle(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="max-[768px]:absolute left-0 bottom-0 w-[100vw] h-[70vh] md:w-[800px] md:h-[720px] bg-ps-white rounded-t-2xl  md:rounded-2xl">
          <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[24px] px-[40px]">
            <h1 className="text-h3 text-ps-gray-600">Rating & Review</h1>
            <Image
              onClick={() => props.closeModal()}
              className="cursor-pointer"
              src={cross_icon}
              alt="cross icon"
            />
          </div>
          <div className="flex flex-col justify-between gap-[40px] py-[15px] md:py-[40px] px-[40px] ">
            <div className="flex flex-col justify-center items-center  gap-[60px] ">
              <div className="flex flex-col justify-center items-center  gap-[24px]">
                <h1 className="text-h3">What is your rate ?</h1>
                <div className="flex flex-col items-center gap-[16px] ">
                  <div className="flex items-center gap-[16px]">
                    {[0, 1, 2, 3, 4].map((item, index) => {
                      return (
                        <Image
                          key={item}
                          onClick={() => setRating(index + 1)}
                          className="cursor-pointer"
                          src={index + 1 <= rating ? green_star : gray_star}
                          alt="stars icon"
                        />
                      );
                    })}
                  </div>
                  {isRatingEqual0 && (
                    <h1 className="text-ps-red">{isRatingEqual0}</h1>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-[5px] md:gap-[14px]">
                <h1 className="text-h3 text-center">
                  Share more about your experience
                </h1>
                <Field name="description" validate={validateDescription}>
                  {({ field }) => (
                    <textarea
                      className="w-full h-[100px] md:h-[200px] rounded-lg border-ps-gray-200  focus:border-ps-gray-200 focus:ring-0"
                      type="text"
                      placeholder="Your review"
                      {...field}
                    />
                  )}
                </Field>
                {errors.description && touched.description && (
                  <div className="text-ps-red bg-transparent">
                    {errors.description}
                  </div>
                )}
                {error ?? <p className="text-ps-red">{error}</p>}
              </div>
            </div>
            <div className="flex justify-between">
              <div onClick={() => props.closeModal()}>
                <ButtonOrangeLight width={"w-[120px]"} text={"Cancel"} />
              </div>
              <div>
                <ButtonOrange
                  width={"max-[768px]:w-[207px]"}
                  text={"Send Review&Rating"}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

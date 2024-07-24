import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { ButtonOrange, ButtonOrangeLight } from "../buttons/OrangeButtons";

const API_URL = "/api/booking";

export default function RatingBookingModal({ isOpen, onCancel, onSubmit }) {
  if (!isOpen) return null;

  const router = useRouter();
  const { id } = router.query;

  const initialValues = {
    rating: 5,
    description: "",
  };

  const [rating, setRating] = useState(5);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.rating) {
      errors.rating = "Rating is required";
    }

    if (!values.description) {
    } else if (values.description.length > 200) {
      errors.description = "Description cannot exceed 200 characters";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = {
      ...values,
      rating: rating,
    };

    try {
      const response = await axios.post(`${API_URL}/${id}/review`, formData);
      console.log("Response:", response.data);

      onSubmit(formData);
      setSubmitting(false);
      onCancel();
    } catch {
      console.log("Error submitting review:");
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div className="absolute left-0 top w-full h-full bg-ps-black opacity-70"></div>
          {/* Modal Box */}
          <div className="absolute max-md:bottom-0 max-md:w-full w-[800px] h-[800px] max-md:h-[548px] bg-ps-white rounded-2xl max-md:rounded-b-none z-40 flex flex-col py-2">
            {/* Modal title */}
            <div className="flex justify-between w-full border-b-[1.5px] border-b-ps-gray-200 pb-4 item items-center px-6 py-4">
              <h3 className="text-h3 text-ps-gray-600 max-md:text-h4">
                Rating & Review
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
            <div className="mx-auto flex flex-col justify-between w-[90%] h-[800px] py-8">
              {/* Rating Star */}
              <div className="mx-auto flex flex-col justify-center items-center gap-5">
                <h3 className="text-h3 text-ps-black px-6">
                  What is your rate?
                </h3>
                <div className="flex items-center gap-4 max-md:gap-3">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <Image
                      key={index}
                      src={
                        index <= rating
                          ? "/assets/icons/icon-star-green.svg"
                          : "/assets/icons/icon-star-gray.svg"
                      }
                      width={60}
                      height={60}
                      className="cursor-pointer star-icon transition-transform transform-gpu hover:scale-110 max-md:w-12"
                      onClick={() => handleRatingClick(index)}
                      name="rating"
                    />
                  ))}
                </div>
              </div>
              {/* Rating Description */}
              <div className="mx-auto w-full flex flex-col justify-center items-center gap-6">
                <h3 className="text-h3 text-ps-black px-6 text-center">
                  Share more about your experience
                </h3>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg w-full h-[243px] max-md:h-[80px] mx-auto resize-none"
                  placeholder="Your review..."
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-ps-red"
                />
              </div>

              {/* Button */}
              <div className="flex justify-between">
                <ButtonOrangeLight text="Cancel" onClick={onCancel} />
                <ButtonOrange
                  text="Send Review & Rating"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

import { Formik, Form, Field } from "formik";
import alert from "@/public/assets/booking/create/alert.svg";
import Image from "next/image";
import PhoneInput from "@/components/authentication/PhoneInput";
import {
  validateName,
  validateEmail,
  validatePhone,
} from "./validate/validate";
import { useBooking } from "@/context/Booking";
import { useOwners } from "@/context/Owners";

export default function Information() {
  const { setStepBooking, addBookingHandle, booking } = useBooking();
<<<<<<< HEAD
  const { user } = useOwners();
=======
  const { userId } = useOwners();
>>>>>>> a24dc1d (feat: able to booking)

  return (
    <Formik
      initialValues={{
<<<<<<< HEAD
        name: user.full_name,
        email: user.email,
        phone: user.phone_number,
=======
        name: userId.full_name,
        email: userId.email,
        phone: userId.phone_number,
>>>>>>> a24dc1d (feat: able to booking)
        message: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        addBookingHandle({ ...booking, message: values.message });
        setStepBooking("payment");
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form className=" w-full h-full p-10 flex flex-col gap-10 max-sm:gap-6 relative">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className="text-b2">
              Your Name*
            </label>
            <Field
              type="text"
              name="name"
              validate={validateName}
              disabled
              placeholder="Full name"
              className={
                errors.name && touched.name
                  ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                  : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              }
            />
            {errors.name && touched.name ? (
              <Image
                src={alert}
                alt={alert}
                className="absolute right-4 top-14"
              />
            ) : null}
          </div>

          <div className="w-full flex max-lg:flex-col lg:justify-between gap-10 relative">
            <div className="w-full lg:w-[50%] flex flex-col relative">
              <label htmlFor="email" className="text-b2">
                Email*
              </label>
              <Field
                type="email"
                name="email"
                disabled
                validate={validateEmail}
                placeholder="youremail@company.com"
                className={
                  errors.email && touched.email
                    ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                    : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                }
              />
              {errors.email && touched.email ? (
                <Image
                  src={alert}
                  alt={alert}
                  className="absolute right-4 top-12"
                />
              ) : null}
            </div>

            <div className="w-full lg:w-[50%] flex flex-col relative">
              <label htmlFor="phone" className="text-b2">
                Phone*
              </label>
              <Field
                type="tel"
                name="phone"
                disabled
                validate={validatePhone}
                component={PhoneInput}
                placeholder="xxx-xxx-xxxx"
                className={
                  errors.phone && touched.phone
                    ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                    : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                }
              />
              {errors.phone && touched.phone ? (
                <Image
                  src={alert}
                  alt={alert}
                  className="absolute right-4 top-12"
                />
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="message" className="text-b2">
              Additional Message (To pet sitter)
            </label>
            <textarea
              name="message"
              rows={4}
              cols={50}
              className="p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 resize-none"
              onChange={(e) => {
                setFieldValue("message", e.target.value);
              }}
            ></textarea>
          </div>

          <button
            type="button"
            onClick={() => {
              setStepBooking("your_pet");
            }}
            className="btn hover:bg-ps-orange-200 max-lg:w-[45%] lg:px-12 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-[-595px] max-lg:left-4 lg:bottom-14"
          >
            Back
          </button>
          <button
            type="summit"
            className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-12 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
}

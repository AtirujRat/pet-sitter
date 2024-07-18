import { Formik, Form, Field } from "formik";
import alert from "@/public/assets/booking/create/alert.svg";
import Image from "next/image";
import PhoneInput from "@/components/authentication/PhoneInput";
import {
  validateName,
  validateEmail,
  validatePhone,
} from "../validate/validate";
import { useSearch } from "@/context/Search";

export default function Information() {
  const { setStepBooking } = useSearch();
  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", message: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="max-lg:hidden  w-full h-full p-10 flex flex-col gap-10 max-sm:gap-6 relative">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className="text-b2">
              Your Name*
            </label>
            <Field
              type="text"
              name="name"
              validate={validateName}
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

          <div className="w-full flex justify-between gap-10 relative">
            <div className="w-[50%] flex flex-col relative">
              <label htmlFor="email" className="text-b2">
                Email*
              </label>
              <Field
                type="email"
                name="email"
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

            <div className="w-[50%] flex flex-col relative">
              <label htmlFor="phone" className="text-b2">
                Phone*
              </label>
              <Field
                type="tel"
                name="phone"
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
              setStepBooking(1);
            }}
            className="py-3 px-12 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-14"
          >
            Back
          </button>
          <button
            type="summit"
            onClick={() => {
              setStepBooking(3);
            }}
            className="py-3 px-12 bg-ps-orange-500 text-ps-white rounded-[99px] absolute bottom-14 right-10"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
}
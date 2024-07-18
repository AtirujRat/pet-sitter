import { Formik, Form, Field } from "formik";
import Image from "next/image";
import alert from "@/public/assets/booking/create/alert.svg";
import CheckCardNumber from "../validate/CheckCardNumber";
import CheckExpire from "../validate/CheckExpire";
import CheckCvc from "../validate/CheckCvc";
import {
  validateCardNumber,
  validateName,
  validateExpire,
  validateCvc,
} from "../validate/validate";
import { useContext } from "react";
import { BookingContext } from "@/context/Booking";

export default function CreditCardPaymentMobile() {
  const { setStepBooking } = useContext(BookingContext);
  return (
    <Formik
      initialValues={{ number: "", name: "", expire: "", cvc: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="lg:hidden w-full flex flex-col gap-10 max-sm:gap-6 ">
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="number" className="text-b2">
              Card Number*
            </label>
            <Field
              name="number"
              validate={validateCardNumber}
              component={CheckCardNumber}
              placeholder="xxx-xxxx-x-xx-xx"
              className={
                errors.number && touched.number
                  ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                  : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              }
            />
            {errors.number && touched.number ? (
              <Image
                src={alert}
                alt={alert}
                className="absolute right-4 top-14"
              />
            ) : null}
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="name" className="text-b2">
              Card Owner*
            </label>
            <Field
              name="name"
              validate={validateName}
              placeholder="Card owner name"
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

          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="expire" className="text-b2">
              Expiry Date*
            </label>
            <Field
              name="expire"
              validate={validateExpire}
              component={CheckExpire}
              placeholder="xxx-xxx-xxxx"
              className={
                errors.expire && touched.expire
                  ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                  : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              }
            />
            {errors.expire && touched.expire ? (
              <Image
                src={alert}
                alt={alert}
                className="absolute right-4 top-14"
              />
            ) : null}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="phone" className="text-b2">
              CVC/CVV*
            </label>
            <Field
              name="cvc"
              validate={validateCvc}
              component={CheckCvc}
              placeholder="xxx"
              className={
                errors.cvc && touched.cvc
                  ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                  : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              }
            />
            {errors.cvc && touched.cvc ? (
              <Image
                src={alert}
                alt={alert}
                className="absolute right-4 top-14"
              />
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => {
              setStepBooking(2);
            }}
            className="btn hover:bg-ps-orange-200 w-[45%] py-3 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-[-595px] left-4"
          >
            Back
          </button>
          <button
            type="summit"
            className="btn hover:bg-ps-orange-600 w-[45%] py-3 bg-ps-orange-500 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4"
          >
            Confirm Booking
          </button>
        </Form>
      )}
    </Formik>
  );
}

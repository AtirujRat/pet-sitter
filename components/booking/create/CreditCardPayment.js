import { Formik, Form, Field } from "formik";
import { useBooking } from "@/context/Booking";
import Image from "next/image";
import alert from "@/public/assets/booking/create/alert.svg";
import CheckCardNumber from "./validate/CheckCardNumber";
import CheckExpire from "./validate/CheckExpire";
import CheckCvc from "./validate/CheckCvc";
import {
  validateCardNumber,
  validateName,
  validateExpire,
  validateCvc,
} from "./validate/validate";

export default function CreditCardPayment() {
  const { setStepBooking, booking, addBookingHandle, setConfirm } =
    useBooking();
  // console.log(booking);
  return (
    <Formik
      initialValues={{ card_number: "", card_name: "", expire: "", cvc: "" }}
      className="w-full h-full"
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        // addBookingHandle({
        //   ...booking,
        //   ...values,
        //   paymet_method: "credit card",
        // });
        setConfirm("confirm");
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full h-full flex flex-col gap-10 max-sm:gap-6 ">
          <div className="w-full flex max-lg:flex-col lg:justify-between gap-10 lg:gap-10 relative">
            <div className="w-full lg:w-[50%] flex flex-col gap-2 relative">
              <label htmlFor="card_number" className="text-b2">
                Card Number*
              </label>
              <Field
                name="card_number"
                validate={validateCardNumber}
                component={CheckCardNumber}
                placeholder="xxx-xxxx-x-xx-xx"
                className={
                  errors.card_number && touched.card_number
                    ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                    : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                }
              />
              {errors.card_number && touched.card_number ? (
                <Image
                  src={alert}
                  alt={alert}
                  className="absolute right-4 top-14"
                />
              ) : null}
            </div>
            <div className="w-full lg:w-[50%] flex flex-col gap-2 relative">
              <label htmlFor="card_name" className="text-b2">
                Card Owner*
              </label>
              <Field
                name="card_name"
                validate={validateName}
                placeholder="Card owner name"
                className={
                  errors.card_name && touched.card_name
                    ? "p-3 border-2 rounded-lg border-ps-red text-b2 font-normal text-ps-gray-400"
                    : "p-3 border-2 rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                }
              />
              {errors.card_name && touched.card_name ? (
                <Image
                  src={alert}
                  alt={alert}
                  className="absolute right-4 top-14"
                />
              ) : null}
            </div>
          </div>

          <div className="w-full flex max-lg:flex-col lg:justify-between gap-10 relative">
            <div className="w-full lg:w-[50%] flex flex-col gap-2 relative">
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

            <div className="w-full lg:w-[50%] flex flex-col gap-2">
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
          </div>

          <button
            type="button"
            onClick={() => {
              setStepBooking("information");
            }}
            className="btn hover:bg-ps-orange-200 max-lg:w-[45%] lg:px-12 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-[-595px] max-lg:left-4 lg:bottom-14"
          >
            Back
          </button>
          <button
            type="summit"
            className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-12 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
          >
            Confirm Booking
          </button>
        </Form>
      )}
    </Formik>
  );
}

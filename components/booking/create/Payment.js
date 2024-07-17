import { Formik, Form, Field } from "formik";
import Image from "next/image";
import alert from "@/public/assets/booking/create/alert.svg";
import CheckCardNumber from "./CheckCardNumber";
import CheckExpire from "./CheckExpire";
import CheckCvc from "./CheckCvc";
import {
  validateCardNumber,
  validateName,
  validateExpire,
  validateCvc,
} from "./validate/validate";

export default function Payment() {
  return (
    <section className="w-full h-full p-10">
      <div className="w-full h-[13%] flex justify-between gap-4">
        <button
          type="button"
          className="w-[50%] h-full border border-ps-orange-500 rounded-full text-ps-orange-500 text-b1 flex justify-center items-center"
        >
          Credit Card
        </button>
        <button
          type="button"
          className="w-[50%] h-full border border-ps-gray-200 rounded-full text-ps-gray-400 text-b1 flex justify-center items-center"
        >
          Cash
        </button>
      </div>
      <Formik
        initialValues={{ number: "", email: "", expire: "", cvc: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="w-full p-10 flex flex-col gap-10 max-sm:gap-6">
            <div className="w-full flex justify-between gap-10 relative">
              <div className="w-[50%] flex flex-col gap-2 relative">
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
              <div className="w-[50%] flex flex-col gap-2 relative">
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
            </div>

            <div className="w-full flex justify-between gap-10 relative">
              <div className="w-[50%] flex flex-col gap-2 relative">
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

              <div className="w-[50%] flex flex-col gap-2">
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

            {/* <button
              className="absolute right-[5%] top-[55%]"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <div className="text-ps-gray-400">hide</div>
              ) : (
                <div className="text-ps-gray-400">show</div>
              )}
            </button>
            {errors.password && touched.password && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.password}
              </div>
            )} */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn text-b2 text-ps-white bg-ps-orange-500 border-none rounded-full hover:bg-ps-orange-400 "
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

import { Formik, Form, Field } from "formik";
import PhoneInput from "@/components/authentication/PhoneInput";

export default function Payment() {
  function validatePhone(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (value[0] != 0) {
      error = "The first digit must be 0.";
    } else if (value.length != 12) {
      error = "Phone number must contain 10 digits.";
    }
    return error;
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  return (
    <section className="w-full h-full p-10">
      <div className="w-full h-[13%] flex justify-between gap-4">
        <p className="w-[50%] h-full border border-ps-orange-500 rounded-full text-ps-orange-500 text-b1 flex justify-center items-center">
          Credit Card
        </p>
        <p className="w-[50%] h-full border border-ps-gray-200 rounded-full text-ps-gray-400 text-b1 flex justify-center items-center">
          Cash
        </p>
      </div>
      <Formik
        initialValues={{ number: "", email: "", phone: "", message: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="w-full p-10 flex flex-col gap-10 max-sm:gap-6">
            <div className="w-full flex justify-between gap-10 relative">
              <div className="w-[50%] flex flex-col gap-2 relative">
                <label htmlFor="number" className="text-b2">
                  Card Number*
                </label>
                <Field
                  type="number"
                  name="number"
                  validate={validateName}
                  placeholder="xxx-xxxx-x-xx-xx"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                />
                {errors.name && touched.name && (
                  <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="w-[50%] flex flex-col gap-2 relative">
                <label htmlFor="number" className="text-b2">
                  Card Owner*
                </label>
                <Field
                  type="number"
                  name="number"
                  validate={validateName}
                  placeholder="Card owner name"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                />
                {errors.name && touched.name && (
                  <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex justify-between gap-10 relative">
              <div className="w-[50%] flex flex-col">
                <label htmlFor="email" className="text-b2">
                  Expiry Date*{" "}
                </label>
                <Field
                  type="email"
                  name="email"
                  validate={validateEmail}
                  placeholder="xxx-xxx-xxxx"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                />
                {errors.email && touched.email && (
                  <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="w-[50%] flex flex-col">
                <label htmlFor="phone" className="text-b2">
                  CVC/CVV*
                </label>
                <Field
                  type="tel"
                  name="phone"
                  validate={validatePhone}
                  component={PhoneInput}
                  placeholder="xxx"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
                />
                {errors.phone && touched.phone && (
                  <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                    {errors.phone}
                  </div>
                )}
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

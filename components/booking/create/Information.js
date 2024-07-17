import { Formik, Form, Field } from "formik";
import PhoneInput from "@/components/authentication/PhoneInput";
export default function Information() {
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
    <Formik
      initialValues={{ name: "", email: "", phone: "", message: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="w-full flex flex-col gap-8 max-sm:gap-6">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className="text-b2">
              Your Name*
            </label>
            <Field
              type="text"
              name="name"
              validate={validateName}
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.name && touched.name && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.name}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="email" className="text-b2">
              Email*
            </label>
            <Field
              type="email"
              name="email"
              validate={validateEmail}
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.email && touched.email && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.email}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="phone" className="text-b2">
              Phone*
            </label>
            <Field
              type="tel"
              name="phone"
              validate={validatePhone}
              component={PhoneInput}
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.phone && touched.phone && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.phone}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="message" className="text-b2">
              Additional Message (To pet sitter)
            </label>
            <textarea
              name="message"
              rows={4}
              cols={50}
              onChange={(e) => {
                setFieldValue("message", e.target.value);
              }}
            ></textarea>
          </div>

          {/* <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-b2">
              Password
            </label>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              validate={validatePassword}
              placeholder="Create your password"
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            <button
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
            )}
          </div> */}

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
  );
}

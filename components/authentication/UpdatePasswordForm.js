import { Formik, Form, Field } from "formik";
import axios from "axios";

function validatePassword(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length <= 8) {
    error = "Password must be more than 8 characters";
  }
  return error;
}

function validateConfirmPassword(value, values) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value !== values.newPassword) {
    error = "Passwords must match";
  }
  return error;
}

export default function UpdatePasswordForm() {
  const getData = async (data) => {
    try {
      await axios.post("/api/authentication/recovery/updatepassword", data);
      alert("Password updated successfully");
    } catch (e) {
      alert("Connection error");
    }
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        getData(values);
      }}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className="w-[440px] flex flex-col gap-8 max-sm:gap-6">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="newPassword" className="text-b2">
              New Password
            </label>
            <Field
              type="password"
              name="newPassword"
              validate={validatePassword}
              placeholder="Enter new password"
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.newPassword && touched.newPassword && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.newPassword}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="confirmPassword" className="text-b2">
              Confirm New Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              validate={(value) => validateConfirmPassword(value, values)}
              placeholder="Confirm new password"
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn text-b2 text-ps-white bg-ps-orange-500 border-none rounded-full hover:bg-ps-orange-400"
          >
            Change Password
          </button>
        </Form>
      )}
    </Formik>
  );
}

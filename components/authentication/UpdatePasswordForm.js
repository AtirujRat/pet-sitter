import { Formik, Form, Field } from "formik";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useUser } from "@/context/User";

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

export default function UpdatePasswordForm(props) {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(
        "sb-etraoduqrzijngbazoib-auth-token"
      );
      return savedState ? JSON.parse(savedState) : {};
    }
  });
  const { setConnection, connection, setResult } = useUser();
  const getData = async (datas) => {
    try {
      const password = await axios.post(props.api, datas);
      const { data, error } = await supabase.auth.updateUser({
        password: password.data.data,
      });

      if (error) {
        setResult("fail");
        setConnection(!connection);
        return;
      }
      await axios.put(props.api, {
        email: token.user.email,
        password: password.data.data,
      });
      setResult("success");
      setConnection(!connection);
    } catch (e) {
      setResult("fail");
      setConnection(!connection);
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
        <Form className="w-full h-full p-10 flex flex-col gap-8 max-sm:gap-6">
          <div className="w-full lg:w-[400px] flex flex-col gap-2 relative">
            <label htmlFor="newPassword" className="text-b1">
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

          <div className="w-full lg:w-[400px] flex flex-col gap-2 relative">
            <label htmlFor="confirmPassword" className="text-b1">
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
            className="btn text-b1 w-full lg:w-[400px] text-ps-white bg-ps-orange-500 border-none rounded-full hover:bg-ps-orange-400"
          >
            Change Password
          </button>
        </Form>
      )}
    </Formik>
  );
}

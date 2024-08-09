import BackgroudAuth from "@/components/authentication/BackgroundAuth";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useUser } from "@/context/User";
import { useRouter } from "next/router";
import ConnectionServer from "@/components/ConnectionServer";

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

export default function RecoveryPage() {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(
        "sb-etraoduqrzijngbazoib-auth-token"
      );
      return JSON.parse(savedState);
    }
  });
  const { setConnection, connection, result, setResult } = useUser();
  const router = useRouter();
  const getData = async (datas) => {
    try {
      const password = await axios.post(
        "/api/authentication/recovery/owner",
        datas
      );
      const { data, error } = await supabase.auth.updateUser({
        password: password.data.data,
      });

      if (error) {
        setResult("fail");
        setConnection(!connection);
        return;
      }
      await axios.put("/api/authentication/recovery/owner", {
        email: token.user.email,
        password: password.data.data,
      });
      await axios.put("/api/authentication/recovery/sitter", {
        email: token.user.email,
        password: password.data.data,
      });
      localStorage.removeItem("sb-etraoduqrzijngbazoib-auth-token");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (e) {
      setResult("fail");
      setConnection(!connection);
    }
  };

  return (
    <section className="w-full h-screen flex max-sm:text-scale-75 justify-center items-center relative z-10">
      <BackgroudAuth />
      {connection && result === "fail" && (
        <ConnectionServer type={"error"} text={"Error connection"} />
      )}
      <div className="max-sm:w-[90%] bg-transparent flex flex-col items-center justify-center max-sm:gap-8 gap-14 absolute">
        <div className="bg-transparent flex flex-col text-center gap-5">
          <h1 className="text-h1 max-sm:text-h2 text-shadow bg-transparent">
            Update <br />
            your password!
          </h1>
        </div>
        <div className="max-sm:text-b2 max-sm:w-[100%] min-sm:w-[20%] flex flex-col gap-8 max-sm:gap-6">
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
        </div>
      </div>
    </section>
  );
}

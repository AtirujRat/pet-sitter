import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/User";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
}

export default function LoginForm(props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { getOwner, getSitter, setConnection, connection } = useUser();
  async function logIn(formData) {
    try {
      if (props.api === "admin") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          setConnection(!connection);
          return;
        }
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
        return;
      }
      const checkUser = await axios.post(props.api, formData);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: checkUser.data.data[0].email,
        password: checkUser.data.data[0].password,
      });
      if (error) {
        setConnection(!connection);
        return;
      }
      if (props.api === "/api/authentication/login/owner") {
        getOwner(checkUser.data.data[0].id);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else if (props.api === "/api/authentication/login/sitter") {
        getSitter(checkUser.data.data[0].id);
        setTimeout(() => {
          router.push(`/sitters/${checkUser.data.data[0].id}/profile`);
        }, 1000);
      }
    } catch (e) {
      setConnection(!connection);
    }
  }

  return (
    <Formik
      initialValues={{ email: "", password: "", remember: false }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          logIn(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full flex flex-col gap-8 max-sm:gap-6">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="email" className="text-b2 text-ps-black">
              Email
            </label>
            <Field
              type="email"
              name="email"
              validate={validateEmail}
              placeholder="email@company.com"
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.email && touched.email && (
              <div className="absolute bottom-[-22px] text-ps-red bg-transparent">
                {errors.email}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-b2 text-ps-black">
              Password
            </label>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              validate={validatePassword}
              placeholder="Input your password"
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            <button
              type="button"
              className="absolute right-[5%] top-[55%]"
              onClick={() => setShowPassword(!showPassword)}
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
          </div>
          {props.api === "admin" ? null : (
            <div className="flex justify-between gap-2 items-center">
              <div className="flex items-center space-x-2">
                <Field
                  id="remember"
                  type="checkbox"
                  name="remember"
                  className="checkbox checkbox-primary [--chkfg:white] border border-ps-gray-300 "
                />
                <label
                  htmlFor="remember"
                  className="label-text text-b2 font-medium cursor-pointer"
                >
                  Remember?
                </label>
              </div>
              <Link href="/login/recovery">
                <p className="text-b2 text-ps-orange-500">Forget Password?</p>
              </Link>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn text-b2 text-ps-white bg-ps-orange-500 border-none rounded-full hover:bg-ps-orange-400"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

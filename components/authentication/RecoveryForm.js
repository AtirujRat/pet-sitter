import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import Link from "next/link";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

export default function RecoveryForm() {
  const [emailSent, setEmailSent] = useState(false);

  async function sendRecoveryEmail(formData) {
    let { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email
    );
    if (error) {
      console.error("Error sending recovery email:");
      return;
    }
    setEmailSent(true);
    console.log("Recovery email sent:", data);
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          sendRecoveryEmail(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-[440px] flex flex-col gap-8 max-sm:gap-6">
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
          {emailSent && (
            <div className="text-b2 text-ps-green-500">
              Recovery email sent! Please check your email.
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn text-b2 text-ps-white bg-ps-orange-500 border-none rounded-full hover:bg-ps-orange-400"
          >
            Send Recovery Email
          </button>
          <Link href="/login/owner">
            <p className="text-b2 text-ps-orange-500 flex ">⬅️ Back to Login</p>
          </Link>
        </Form>
      )}
    </Formik>
  );
}

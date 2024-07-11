import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

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
  } else if (value.length <= 8) {
    error = "Password must more than 8";
  }
  return error;
}

export default function LoginForm() {
  const router = useRouter();

  async function logIn(formData) {
    const { data, error } = await supabase.auth.signInWithPassword(formData);
    if (error) {
      console.error("error");
      return;
    }
    router.push("/");
    console.log(data);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          logIn(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched, isValidating, isSubmitting }) => (
        <Form className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-2">
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
            {errors.email && touched.email && <div>{errors.email}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-b2 text-ps-black">
              Password
            </label>
            <Field
              type="password"
              name="password"
              validate={validatePassword}
              placeholder="Create your password"
              className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn text-b2 text-ps-white bg-ps-orange-500 border-none rounded-full"
            onClick={logIn}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

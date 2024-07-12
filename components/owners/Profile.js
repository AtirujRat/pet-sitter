import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import import_button from "@/public/assets/account/import_button.svg";
import profile_icon from "@/public/assets/account/profile_white.svg";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import PhoneInput from "../authentication/PhoneInput";
import IdInput from "../authentication/IdInput";
import { supabase } from "@/utils/supabase";

function validateName(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6 || value.length > 20) {
    error = "Name characters must be between 6-20";
  }
  return error;
}

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

async function validateNumber(value) {
  let error;

  let { data: owner_id_number } = await supabase
    .from("owners")
    .select("*")
    .eq("id_number)", value);

  if (!value) {
    error = "Required";
  } else if (value.length !== 13) {
    error = "Id number must have 13 digits";
  } else if (owner_id_number[0]) {
    error = "This Id number already exist";
  }

  return error;
}

function validateCalendar(value) {
  let error;
  const selectedDate = new Date(value);
  const today = new Date();
  if (today <= selectedDate) {
    error = "Date cannot be in the future";
  } else if (value === "") {
    error = "Require";
  }

  return error;
}

//To preview image
const ImageChange = ({ setPreview }) => {
  const { setFieldValue } = useFormikContext();
  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <input
      className="w-[60px] h-[60px] opacity-0"
      type="file"
      name="image"
      onChange={handleImageChange}
      accept="image/*"
    />
  );
};

//upload to storage
const uploadImageHandle = async (file) => {
  const { data, error } = await supabase.storage
    .from("owner")
    .upload("profile_image/" + file?.name, file);
  if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }
};

const Profile = () => {
  const [preview, setPreview] = useState(null);
  const [userData, setUser] = useState();

  const getUser = async () => {
    const {
      data: { user, error },
    } = await supabase.auth.getUser();
    if (!user) {
      console.log("error");
    }

    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  //insert to table
  const updateProfile = async (formData) => {
    if (userData !== null) {
      const { error } = await supabase
        .from("owners")
        .update({
          profile_image_url: formData.image.name,
          full_name: formData.name,
          email: formData.email,
          phone_number: formData.phone,
          id_number: formData.id_number,
          date_of_birth: formData.date_of_birth,
          updated_at: new Date(),
        })
        .eq("email", userData?.email)
        .select();
      if (error) {
        console.log(error);
      }
    }
  };

  async function validateEmail(value) {
    let error;
    let { data: owner_email } = await supabase
      .from("owners")
      .select("*")
      .eq("email", value);

    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    } else if (owner_email[0]) {
      error = "This email already exist";
    }

    return error;
  }

  return (
    <Formik
      initialValues={{
        image: null,
        name: "",
        email: "",
        phone: "",
        id_number: "",
        date_of_birth: "",
      }}
      validationSchema={Yup.object({
        image: Yup.mixed(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        updateProfile(values);
        uploadImageHandle(values.image);
        setSubmitting(false);
        console.log(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full lg:w-[965px] h-fit shadow-md rounded-2xl p-[10px] lg:p-[40px] flex flex-col items-start gap-[20px] lg:gap-[45px]">
          <h1 className="text-h3">Profile</h1>
          <div className="relative flex justify-center items-center w-[120px] h-[120px] lg:w-[220px] lg:h-[220px] bg-ps-gray-300 rounded-full">
            {preview ? (
              <img
                src={preview}
                alt="Image Preview"
                className="absolute w-full h-full object-cover rounded-full"
              />
            ) : (
              <Image
                className="absolute w-[86px] h-[86px]"
                src={profile_icon}
                alt="profile icon"
              />
            )}
            <div className="absolute bottom-0 right-0 ">
              <Image
                className="absolute bottom-0 right-0 w-[30px] h-[30px]  lg:w-[60px] lg:h-[60px]"
                src={import_button}
                alt="import button"
              />
              <Field component={ImageChange} setPreview={setPreview} />
            </div>
          </div>
          {errors.image && touched.image && (
            <div className="text-ps-red">{errors.image}</div>
          )}
          <div className="flex flex-col w-full gap-2">
            <label className="text-b2">Your Name*</label>
            <Field
              type="text"
              name="name"
              className="text-b2 rounded-lg border-2 border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0"
              validate={validateName}
            />
            {errors.name && touched.name && (
              <div className="text-ps-red">{errors.name}</div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-[40px]">
            <div className="flex flex-col w-full lg:w-[50%] gap-2">
              <label className="text-b2">Email*</label>
              <Field
                type="email"
                name="email"
                className="text-b2 rounded-lg border-2 border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0"
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <div className="text-ps-red">{errors.email}</div>
              )}
            </div>
            <div className="flex flex-col w-full lg:w-[50%] gap-2">
              <label className="text-b2">Phone*</label>
              <Field
                type="tel"
                name="phone"
                component={PhoneInput}
                validate={validatePhone}
                className="text-b2 rounded-lg border-2 border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0"
              />
              {errors.phone && touched.phone && (
                <div className="text-ps-red">{errors.phone}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-[40px]">
            <div className="flex flex-col w-full lg:w-[50%] gap-2">
              <label className="text-b2">ID Number</label>
              <Field
                type="text"
                name="id_number"
                validate={validateNumber}
                component={IdInput}
                className="text-b2 rounded-lg border-2 border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0"
              />
              {errors.id_number && touched.id_number && (
                <div className="text-ps-red">{errors.id_number}</div>
              )}
            </div>
            <div className="flex flex-col w-full lg:w-[50%] gap-2">
              <label className="text-b2">Date of Birth</label>
              <Field
                type="date"
                name="date_of_birth"
                validate={validateCalendar}
                className="text-b2 rounded-lg border-2 border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0"
              />
              {errors.date_of_birth && touched.date_of_birth && (
                <div className="text-ps-red">{errors.date_of_birth}</div>
              )}
            </div>
          </div>
          <div className="w-full text-end">
            <button
              type="submit"
              className="w-[159px] h-[48px] rounded-full bg-ps-orange-500 text-ps-white"
            >
              Update profile
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;

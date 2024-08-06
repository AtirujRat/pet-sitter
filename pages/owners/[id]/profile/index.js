import SideBarOwners from "@/components/owners/SideBarOwners";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import import_button from "@/public/assets/account/import_button.svg";
import profile_icon from "@/public/assets/booking/owner-profile.svg";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import PhoneInput from "@/components/authentication/PhoneInput";
import IdInput from "@/components/authentication/IdInput";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useOwners } from "@/context/Owners";
import ConnectionServer from "@/components/ConnectionServer";
import { useUser } from "@/context/User";

function validateName(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6 || value.length > 20) {
    error = "Name characters must be between 6-20";
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
    error = "Required";
  }
  return error;
}

async function validateNumber(value, userData) {
  let error;

  const owners = await axios.get(`/api/owner/getowners`);

  const id_number = owners.data.map((item) => item.id_number);

  const isNumberExist = id_number.filter(
    (item) => item !== userData?.id_number
  );

  if (!value) {
    error = "Required";
  } else if (value.length !== 13) {
    error = "Id number must have 13 digits";
  } else if (isNumberExist.includes(value)) {
    error = "Id number already exists";
  }

  return error;
}

async function validatePhone(value, userData) {
  let error;

  const owners = await axios.get(`/api/owner/getowners`);

  const phone_number = owners.data.map((item) => item.phone_number);

  const isPhoneNumber = phone_number.filter(
    (item) => item !== userData?.phone_number
  );

  if (!value) {
    error = "Required";
  } else if (value[0] != 0) {
    error = "The first digit must be 0.";
  } else if (value.length != 12) {
    error = "Phone number must contain 10 digits.";
  } else if (isPhoneNumber.includes(value)) {
    error = "Phone number already exists";
  }
  return error;
}

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
      className="w-[60px] h-[90px] cursor-pointer opacity-0"
      type="file"
      name="profile_image_url"
      onChange={handleImageChange}
      accept="image/jpeg, image/png, image/jpg"
    />
  );
};

export default function Account() {
  const [userData, setUser] = useState(null);
  const [preview, setPreview] = useState();
  const { getUserAuth } = useOwners();
  const [error, setError] = useState(null);
  const { connection, setConnection } = useUser();

  async function getUser() {
    try {
      const ownerEmail = await getUserAuth();
      const ownerData = await axios.get(
        `/api/owner/${ownerEmail.email}/queryowner`
      );
      if (ownerData) {
        setUser(ownerData.data[0]);
      }
    } catch {
      setError("Something went wrong");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const initialValues = {
    profile_image_url: userData?.profile_image_url,
    full_name: userData?.full_name || "",
    email: userData?.email || "",
    phone_number: userData?.phone_number || "",
    id_number: userData?.id_number || "",
    date_of_birth: userData?.date_of_birth || "",
  };

  async function updateProfile(formData) {
    const fileName = uuidv4();
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit

    try {
      let publicAttachmentUrl;
      if (formData.image) {
        if (formData.image.size > maxSizeInBytes) {
          alert("File size exceeds 2MB limit");
          return;
        }

        const { data: uploadData, error: image_url_error } =
          await supabase.storage
            .from("owner")
            .upload("profile_image/" + fileName, formData.image);

        if (image_url_error) {
          console.log(image_url_error);
          return;
        } else {
          publicAttachmentUrl = supabase.storage
            .from("owner/profile_image")
            .getPublicUrl(fileName);

          if (userData?.profile_image_url) {
            const existingProfileImage = userData?.profile_image_url;
            const urlParts = existingProfileImage.split("/");
            const existingFileName = urlParts[urlParts.length - 1];

            if (fileName !== existingFileName) {
              const { data, error } = await supabase.storage
                .from("owner")
                .remove([`profile_image/${existingFileName}`]);
              if (error) {
                console.error("Error deleting old image:", error);
                throw error;
              }
            }
          }
        }
      } else {
        publicAttachmentUrl = {
          data: { publicUrl: userData?.profile_image_url },
        };
      }

      await axios.put("/api/owner/updateowner", {
        id: userData?.id,
        profile_image_url: publicAttachmentUrl.data.publicUrl,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        id_number: formData.id_number,
        date_of_birth: formData.date_of_birth,
      });
      setConnection(true);
    } catch (error) {
      alert("errr");
    }
  }

  return (
    <div className="w-full h-full bg-ps-gray-100  lg:pt-10 lg:pb-20 ">
      <div className="max-w-[1440px] min-w-0 lg:flex lg:justify-between mx-auto max-lg:flex-col lg:items-start lg:px-20  gap-9">
        <SideBarOwners />
        {connection && (
          <ConnectionServer type="success" text="Profile has been updated" />
        )}

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Yup.object({
            image: Yup.mixed(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            updateProfile(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full lg:w-[965px] bg-ps-white h-fit shadow-md lg:rounded-2xl p-[10px] lg:p-[40px] flex flex-col items-start gap-[20px] lg:gap-[45px]">
              <h1 className="text-h3">Profile</h1>
              {error && <p>{error}</p>}

              <div className="relative flex justify-center items-center w-[120px] h-[120px] lg:w-[220px] lg:h-[220px] bg-ps-gray-300 rounded-full">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="absolute w-full h-full object-cover rounded-full"
                  />
                ) : userData?.profile_image_url === "NULL" ? (
                  <Image
                    src={profile_icon}
                    alt="profile icon"
                    className="absolute w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={userData?.profile_image_url}
                    alt="profile image"
                    className="absolute w-full h-full object-cover rounded-full"
                  />
                )}
                <div className="absolute bottom-0 right-0">
                  <Image
                    className="absolute bottom-0 right-0 w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
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
                <label className="text-b2 ">Your Name*</label>
                <Field
                  type="text"
                  name="full_name"
                  className="text-b2 rounded-lg border-[1px] border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0 text-[#7B7E8F]"
                  validate={(value) => validateName(value)}
                  placeholder="Full name"
                />
                {errors.full_name && touched.full_name && (
                  <div className="text-ps-red">{errors.full_name}</div>
                )}
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-[40px]">
                <div className="flex flex-col w-full lg:w-[50%] gap-2">
                  <label className="text-b2">Email*</label>
                  <Field
                    type="email"
                    name="email"
                    disabled={true}
                    className="text-b2 rounded-lg border-[1px] border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0 text-[#7B7E8F]"
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-ps-red">{errors.email}</div>
                  )}
                </div>
                <div className="flex flex-col w-full lg:w-[50%] gap-2">
                  <label className="text-b2">Phone*</label>
                  <Field
                    type="tel"
                    name="phone_number"
                    component={PhoneInput}
                    validate={(value) => validatePhone(value, userData)}
                    className="text-b2 rounded-lg border-[1px] border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0 text-[#7B7E8F]"
                    placeholder="Phone number"
                  />
                  {errors.phone_number && touched.phone_number && (
                    <div className="text-ps-red">{errors.phone_number}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-[40px]">
                <div className="flex flex-col w-full lg:w-[50%] gap-2">
                  <label className="text-b2">ID Number</label>
                  <Field
                    type="text"
                    name="id_number"
                    validate={(value) => validateNumber(value, userData)}
                    component={IdInput}
                    className="text-b2 rounded-lg border-[1px] border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0 text-[#7B7E8F]"
                    placeholder="Id number"
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
                    className="text-b2 rounded-lg border-[1px] border-ps-gray-200 focus:border-ps-gray-200 focus:ring-0 text-[#7B7E8F]"
                    placeholder="Date of birth"
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
      </div>
    </div>
  );
}

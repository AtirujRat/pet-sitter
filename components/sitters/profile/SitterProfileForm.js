import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useSitterForm } from "@/hook/useSitterForm";
import { useState, useRef } from "react";
import PhoneInput from "@/components/authentication/PhoneInput";
import MultiSelect from "./MultiSelectPetType";
import userimage from "../../../public/assets/navbar/usermock.svg";
import plus from "../../../public/assets/icon-plus.svg";
import iconUpLoad from "../../../public/assets/sitters/icon-upload.svg";
import iconClose from "../../../public/assets/sitters/icon-close.svg";
import iconApproved from "../../../public/assets/sitters/icon-approved.svg";
import * as Yup from "yup";
import axios from "axios";

const SitterProfileForm = ({ profile = {} }) => {
  const router = useRouter();
  const { id } = router.query;
  const { initialValues, validate, onSubmit } = useSitterForm(id);

  const initialFormValues = {
    ...initialValues,
    ...profile,
  };

  const ImageChange = () => {
    const [preview, setPreview] = useState(profile.profile_image_url || null);
    const [error, setError] = useState(null);
    const { setFieldValue } = useFormikContext();
    const fileInputRef = useRef(null);

    const handleImageChange = async (event) => {
      const file = event.currentTarget.files[0];

      if (file && file.size > 2 * 1024 * 1024) {
        setError("File size should not exceed 2 MB.");
        return;
      }

      if (
        file &&
        !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ) {
        setError("Only .jpg, .jpeg, and .png files are allowed.");
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFieldValue("profile_image_url", reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="relative w-[240px] h-[240px]">
        {preview ? (
          <Image
            src={preview}
            alt="Profile Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            priority
          />
        ) : (
          <Image
            src={userimage}
            alt="Default User Image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        )}
        <input
          className="absolute w-[60px] h-[60px] opacity-0 cursor-pointer"
          type="file"
          ref={fileInputRef}
          name="profile_image_url"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <div
          onClick={() => fileInputRef.current.click()}
          className="absolute z-10 bottom-0 right-0 cursor-pointer"
        >
          <Image src={plus} alt="Upload Icon" width={60} height={60} />
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  };

  const ImageGallery = () => {
    const [gallery, setGallery] = useState([]);
    const fileInputRef = useRef(null);

    const handleGalleryChange = async (event) => {
      const files = event.target.files;
      if (files.length + gallery.length > 10) {
        alert("You can only upload a maximum of 10 images.");
        return;
      }

      const newImages = [];
      for (const file of files) {
        if (file.size <= 2 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push(reader.result);
            setGallery((prev) => [...prev, reader.result]);
          };
          reader.readAsDataURL(file);
        } else {
          alert("File size should not exceed 2 MB.");
        }
      }
    };

    const handleRemoveImage = (index) => {
      setGallery(gallery.filter((_, i) => i !== index));
    };

    return (
      <div className="flex flex-wrap gap-4">
        {gallery.map((image, index) => (
          <div key={index} className="relative w-[167px] h-[167px]">
            <Image
              src={image}
              alt={`Gallery image ${index}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div
              className="absolute w-[24px] h-[24px] top-0 right-0 translate-x-1 -translate-y-1 cursor-pointer rounded-full bg-ps-gray-400 flex items-center justify-center"
              onClick={() => handleRemoveImage(index)}
            >
              <Image src={iconClose} alt="Remove Icon" width={8} height={8} />
            </div>
          </div>
        ))}
        {gallery.length < 10 && (
          <div
            className="w-[167px] h-[167px] flex flex-col justify-center items-center bg-ps-orange-100 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              onChange={handleGalleryChange}
              accept="image/*"
              multiple
            />
            <Image src={iconUpLoad} width={40} height={40} alt="Upload Icon" />
            <p className="text-ps-orange-500 font-bold text-[16px] p-3">
              Upload Image
            </p>
          </div>
        )}
      </div>
    );
  };

  const data = async (values) => {
    try {
      await axios.put(`/api/sitters/${id}`, values);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      // validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(true);
        data(values);
      }}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <div className="text-h3 flex justify-between">
            <div className="flex items-center gap-6">
              <p>Pet Sitter Profile</p>
              <p className="text-[16px] text-ps-green-500 flex text-center gap-2">
                <Image
                  src={iconApproved}
                  width={6}
                  height={6}
                  alt="Approved Icon"
                />
                {profile.sitter_status &&
                  profile.sitter_status[0].toUpperCase() +
                    profile.sitter_status.slice(1)}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-ps-white w-[120px] h-[48px] text-center text-[16px] font-bold bg-ps-orange-500 rounded-full"
            >
              Update
            </button>
          </div>
          <div className="bg-ps-white rounded-2xl px-20 py-10 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <p className="text-ps-gray-300 text-h3">Basic Information</p>
              <label htmlFor="profile_image_url" className="text-b2">
                Profile Image
              </label>
              <Field component={ImageChange} name="profile_image_url" />
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="full_name" className="text-b2">
                  Your full name*
                </label>
                <Field
                  type="text"
                  name="full_name"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.full_name && touched.full_name && (
                  <div className="text-ps-red">{errors.full_name}</div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="experience" className="text-b2">
                  Experience*
                </label>
                <Field
                  as="select"
                  name="experience"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                >
                  <option value="" label="Select experience" />
                  <option value="0-2" label="0-2 year" />
                  <option value="3-5" label="3-5 years" />
                  <option value="5" label="5+ years" />
                </Field>
                {errors.experience && touched.experience && (
                  <div className="text-ps-red">{errors.experience}</div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="phone_number" className="text-b2">
                  Phone Number*
                </label>
                <Field
                  type="tel"
                  name="phone_number"
                  component={PhoneInput}
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.phone_number && touched.phone_number && (
                  <div className="text-ps-red">{errors.phone_number}</div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-b2">
                  Email*
                </label>
                <Field
                  type="email"
                  name="email"
                  disabled={true}
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-300 focus:outline-none focus:ring-0"
                />
                {errors.email && touched.email && (
                  <div className="text-ps-red">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="introduction" className="text-b2">
                  Introduction (Describe about yourself as pet sitter)
                </label>
                <Field
                  as="textarea"
                  name="introduction"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                />
                {errors.introduction && touched.introduction && (
                  <div className="text-ps-red">{errors.introduction}</div>
                )}
              </div>
            </div>
          </div>

          {/* Pet Sitter */}
          <div className="bg-ps-white rounded-2xl px-20 py-10 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <p className="text-ps-gray-300 text-h3">Pet Sitter</p>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-1/2">
                <label htmlFor="trade_name" className="text-b2">
                  Pet sitter name (Trade Name)*
                </label>
                <Field
                  type="text"
                  name="trade_name"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.trade_name && touched.trade_name && (
                  <div className="text-ps-red">{errors.trade_name}</div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="pet_type" className="text-b2">
                  Pet type
                </label>
                <Field
                  component={MultiSelect}
                  name="pet_type"
                  options={["Dog", "Cat", "Bird", "Rabbit"]}
                />
                {errors.pet_type && touched.pet_type && (
                  <div className="text-ps-red">{errors.pet_type}</div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="services_description" className="text-b2">
                  Services (Describe all of your service for pet sitting)
                </label>
                <Field
                  as="textarea"
                  name="services_description"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                />
                {errors.services_description &&
                  touched.services_description && (
                    <div className="text-ps-red">
                      {errors.services_description}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="place_description" className="text-b2">
                  My Place (Describe you place)
                </label>
                <Field
                  as="textarea"
                  name="place_description"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                />
                {errors.place_description && touched.place_description && (
                  <div className="text-ps-red">{errors.place_description}</div>
                )}
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full gap-4">
                <label htmlFor="gallery" className="text-b2">
                  Image Gallery (Maximum 10 images)
                </label>
                <Field component={ImageGallery} name="gallery" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default SitterProfileForm;

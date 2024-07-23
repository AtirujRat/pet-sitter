import Image from "next/image";
import { Formik, Form, Field, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import axios from "axios";
import * as Yup from "yup";
import { useSearch } from "@/context/Search";

import AddressForm from "@/components/map/AddressForm";
import PhoneInput from "@/components/authentication/PhoneInput";
import MultiSelect from "./MultiSelectPetType";
import userimage from "@/public/assets/navbar/usermock.svg";
import plus from "@/public/assets/icon-plus.svg";
import iconUpLoad from "@/public/assets/sitters/icon-upload.svg";
import iconClose from "@/public/assets/sitters/icon-close.svg";
import iconApproved from "@/public/assets/sitters/icon-approved.svg";

function validateName(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6 || value.length > 20) {
    error = "Name characters must be between 6-20";
  }
  return error;
}

function validateRequired(value) {
  let error;
  if (!value || value === "") {
    error = "Required";
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

const ImageGallery = ({ gallery, setGallery, images, setImage }) => {
  const { setFieldValue } = useFormikContext();

  const handleGalleryChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + gallery.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }

    for (const file of files) {
      if (file.size <= 2 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGallery((prev) => [...prev, reader.result]);
          const newImage = images;
          newImage.push(file);
          setImage(newImage);
          // setFieldValue("sitters_images", images);
        };
        reader.readAsDataURL(file);
      } else {
        alert("File size should not exceed 2 MB.");
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);

    const newImagesGallery = images.filter((_, i) => i !== index);
    setImage(newImagesGallery);

    // setFieldValue("sitters_images", newImagesGallery);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {gallery.map((image, index) => (
        <div key={index} className="relative w-[167px] h-[167px]">
          <img
            src={image}
            alt={`Gallery image ${index}`}
            className="object-cover w-full h-full rounded-lg"
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
        <div className="w-[167px] h-[167px] flex flex-col justify-center items-center bg-ps-orange-100 rounded-lg cursor-pointer">
          <input
            className="hidden"
            type="file"
            id="fileInput"
            onChange={handleGalleryChange}
            accept="image/*"
            multiple
          />
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center cursor-pointer"
          >
            <Image src={iconUpLoad} width={40} height={40} alt="Upload Icon" />
            <p className="text-ps-orange-500 font-bold text-[16px] p-3">
              Upload Image
            </p>
          </label>
        </div>
      )}
    </div>
  );
};

export default function SitterProfileForm({ profile = {} }) {
  const router = useRouter();
  const { id } = router.query;
  const { address, setAddress } = useSearch();

  console.log(address);

  const initialValues = {
    profile_image_url: null,
    full_name: "",
    experience: "",
    phone_number: "",
    email: "",
    introduction: "",
    trade_name: "",
    pet_type: "",
    services: "",
    sitters_image_url: null,
    place_description: "",
    // address: {
    //   add: "",
    //   province: "",
    //   district: "",
    //   subDistrict: "",
    //   zip_code: "",
    // },
  };

  const initialFormValues = {
    ...initialValues,
    ...profile,
  };

  const [preview, setPreview] = useState(profile?.profile_image_url || null);
  const [gallery, setGallery] = useState([]);
  const [images, setImage] = useState([]);

  const ImageChange = ({ setPreview }) => {
    const { setFieldValue } = useFormikContext();
    const handleImageChange = async (event) => {
      const file = event.currentTarget.files[0];
      setFieldValue("profile_image_url", file);

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
        name="profile_image_url"
        onChange={handleImageChange}
        accept="image/*"
      />
    );
  };

  const uploadImage = async (file, folder) => {
    const fileName = uuidv4();
    const { data, error } = await supabase.storage
      .from("sitters")
      .upload(`${folder}/${fileName}`, file);
    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    } else {
      const url = supabase.storage
        .from("sitters")
        .getPublicUrl(`${folder}/${fileName}`).data.publicUrl;
      return url;
    }
  };

  const updateProfile = async (values) => {
    console.log(values);
    try {
      // Upload profile image if it exists
      let profileImageUrl = null;
      if (
        values.profile_image_url !== profile.profile_image_url ||
        values.profile_image_url === null
      ) {
        profileImageUrl = await uploadImage(
          values.profile_image_url,
          "profile_image"
        );
      } else {
        profileImageUrl = profile.profile_image_url;
      }

      // Upload gallery images
      const galleryImageUrls = [];
      for (const file of images) {
        const url = await uploadImage(file, "gallery_images");
        galleryImageUrls.push({ image_url: url });
      }

      // Update profile with uploaded image URLs
      const updatedValues = {
        ...values,
        profile_image_url: profileImageUrl,
        sitters_images: galleryImageUrls,
      };

      await axios.put(`/api/sitters/${id}`, updatedValues);
      alert("Profile updated successfully!");
      router.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={Yup.object({
        profile_image_url: Yup.mixed(),
        // address: Yup.object({
        //   add: Yup.string().required("Required"),
        //   province: Yup.string().required("Required"),
        //   district: Yup.string().required("Required"),
        //   subDistrict: Yup.string().required("Required"),
        //   zip_code: Yup.string().required("Required"),
        // }).required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // console.log(values);
        const data = { ...values, sitters_addresses: address };
        console.log(data);
        updateProfile(data);
        setSubmitting(false);
      }}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => {
        return (
          <Form className="flex flex-col gap-6">
            <div className="text-h3 flex justify-between">
              <div className="flex items-center gap-6">
                <p className="text-h3">Pet Sitter Profile</p>
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
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>

            {/* Basic Information */}
            <div className="bg-ps-white rounded-2xl px-20 py-10 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <p className="text-ps-gray-300 text-h3">Basic Information</p>
                <label htmlFor="profile_image_url" className="text-b2">
                  Profile Image
                </label>
                <div className="relative flex justify-center items-center w-[120px] h-[120px] lg:w-[220px] lg:h-[220px] bg-ps-gray-300 rounded-full">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Image Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      width={240}
                      height={240}
                      src={userimage}
                      alt="profile icon"
                    />
                  )}
                  <div className="absolute bottom-0 right-0 ">
                    <Image
                      className="absolute bottom-0 right-0 w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
                      src={plus}
                      alt="import button"
                    />
                    <Field component={ImageChange} setPreview={setPreview} />
                  </div>
                </div>
                {errors.profile_image_url && touched.profile_image_url && (
                  <div className="text-ps-red">{errors.profile_image_url}</div>
                )}
              </div>
              <div className="flex w-full gap-10">
                <div className="flex flex-col w-full">
                  <label htmlFor="full_name" className="text-b2">
                    Your full name*
                  </label>
                  <Field
                    type="text"
                    name="full_name"
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                    validate={validateName}
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
                    validate={validateRequired}
                    className="p-3 border rrounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
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
                    validate={validatePhone}
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
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
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-300 focus:outline-none focus:ring-0"
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
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
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
                    validate={validateRequired}
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                  />
                  {errors.trade_name && touched.trade_name && (
                    <div className="text-ps-red">{errors.trade_name}</div>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-10">
                <div className="flex flex-col w-full">
                  <label htmlFor="pet_types" className="text-b2">
                    Pet type
                  </label>
                  <Field
                    validate={validateRequired}
                    component={MultiSelect}
                    name="pet_types"
                    options={["Dog", "Cat", "Bird", "Rabbit"]}
                  />
                  {errors.pet_types && touched.pet_types && (
                    <div className="text-ps-red">{errors.pet_types}</div>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-10">
                <div className="flex flex-col w-full">
                  <label htmlFor="services" className="text-b2">
                    Services (Describe all of your service for pet sitting)
                  </label>
                  <Field
                    as="textarea"
                    name="services"
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                  />
                  {errors.services && touched.services && (
                    <div className="text-ps-red">{errors.services}</div>
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
                    className="p-3 border rounded-lg border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                  />
                  {errors.place_description && touched.place_description && (
                    <div className="text-ps-red">
                      {errors.place_description}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-10">
                <div className="flex flex-col w-full gap-4">
                  <label htmlFor="gallery" className="text-b2">
                    Image Gallery (Maximum 10 images)
                  </label>
                  <ImageGallery
                    gallery={gallery}
                    setGallery={setGallery}
                    images={images}
                    setImage={setImage}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-ps-white rounded-2xl px-20 py-10 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <p className="text-ps-gray-300 text-h3">Address</p>
              </div>
              <Field
                component={AddressForm}
                name="address"
                validate={validateRequired}
                existingAddress={profile.sitters_addresses}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

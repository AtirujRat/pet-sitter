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
import axios from "axios";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";

const ImageGallery = ({ gallery, setGallery }) => {
  const { setFieldValue } = useFormikContext();

  const handleGalleryChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + gallery.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }

    const newImages = [];
    // const newFileList = [];

    for (const file of files) {
      // if (file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        // console.log(reader.result);
        setGallery((prev) => [...prev, reader.result]);
        // newFileList.push(file);
        // setFieldValue("sitters_images", [...gallery, ...newImages]);
        setFieldValue([...gallery, ...files]);
      };
      // console.log(newImages);
      reader.readAsDataURL(file);
      // } else {
      //   alert("File size should not exceed 2 MB.");
      // }
    }
    console.log(gallery);

    // console.log(newFileList);
    console.log(newImages.length);
  };

  const handleRemoveImage = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    setFieldValue("sitters_images", newGallery);
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

const SitterProfileForm = ({ profile = {} }) => {
  const router = useRouter();
  const { id } = router.query;
  const { initialValues, validate, onSubmit } = useSitterForm(id);

  const initialFormValues = {
    ...initialValues,
    ...profile,
  };

  const [preview, setPreview] = useState(profile.profile_image_url || null);
  const [gallery, setGallery] = useState([]);

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

  // const data = async (values) => {
  //   try {
  //     await axios.put(`/api/sitters/${id}`, values);
  //     alert("Profile updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating profile:", error.response.data);
  //     alert("Failed to update profile. Please try again.");
  //   }
  // };

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
    // const fileName = uuidv4();
    try {
      // Upload profile image if it exists
      let profileImageUrl = null;
      if (values.profile_image_url) {
        profileImageUrl = await uploadImage(
          values.profile_image_url,
          "profile_image"
        );
      }

      // Upload gallery images
      const galleryImageUrls = [];
      // let fileNameGallery = [];
      for (const file of gallery) {
        const url = await uploadImage(file, "gallery_images");
        galleryImageUrls.push(url);
        // fileNameGallery.push(fName);
      }
      console.log(gallery);
      // Update profile with uploaded image URLs
      const updatedValues = {
        ...values,
        profile_image_url: profileImageUrl,
        sitters_images: galleryImageUrls,
        // fileName: fileName,
      };

      // data(updatedValues);

      await axios.put(`/api/sitters/${id}`, updatedValues);
      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // const updateProfile = async (values) => {
  //   const fileName = uuidv4();

  //   const { error } = await supabase.storage
  //     .from("sitters")
  //     .upload("profile_image/" + fileName, values.profile_image_url);
  //   console.log(values);

  //   if (error) {
  //     console.log(error);
  //   }

  //   const galleryImageUrls = [];
  //   for (const file of values.sitters_images) {
  //     const url = await uploadImage(file, "gallery_images");
  //     galleryImageUrls.push(url);
  //     // fileNameGallery.push(fName);
  //   }
  //   // console.log(reqBody.profile_image_url);
  //   data({ ...values, fileName });
  // };

  return (
    <Formik
      initialValues={initialFormValues}
      // validate={validate}
      validationSchema={Yup.object({
        image: Yup.mixed(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        updateProfile(values);
        setSubmitting(false);
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
              {/* <Field component={ImageChange} name="profile_image_url" /> */}
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
              {errors.image && touched.image && (
                <div className="text-ps-red">{errors.image}</div>
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
                <label htmlFor="pet_types" className="text-b2">
                  Pet type
                </label>
                <Field
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
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
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
                <ImageGallery gallery={gallery} setGallery={setGallery} />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default SitterProfileForm;

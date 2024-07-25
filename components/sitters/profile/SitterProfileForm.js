import Image from "next/image";
import { Formik, Form, Field, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import axios from "axios";
import * as Yup from "yup";
import { useSearch } from "@/context/Search";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import AddressForm from "@/components/map/AddressForm";
import PhoneInput from "@/components/authentication/PhoneInput";
import MultiSelect from "./MultiSelectPetType";
import userimage from "@/public/assets/navbar/usermock.svg";
import plus from "@/public/assets/icon-plus.svg";
import iconExclamation from "@/public/assets/icons/icon-exclamation-circle.svg";
import ImageGallery from "./ImageGallery";
import { SittersProfileContext } from "@/pages/sitters/[id]/profile";
import { Approved, WaitingForApproval, Rejected } from "./SittersStatus";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateRequired,
  validateRequiredAddress,
} from "./validateProfileform";

export default function SitterProfileForm({ profile = {} }) {
  const router = useRouter();
  const { id } = router.query;
  const { address, searchLng, searchLat } = useSearch();
  const { getImages, storageImages, CDNURL } = useContext(
    SittersProfileContext
  );

  const initialValues = {
    profile_image_url: null,
    full_name: "",
    experience: "",
    phone_number: "",
    email: "",
    introduction: "",
    trade_name: "",
    pet_types: "",
    services: "",
    sitters_image_url: null,
    place_description: "",
  };

  const initialFormValues = {
    ...initialValues,
    ...profile,
  };

  const [preview, setPreview] = useState(profile?.profile_image_url || null);

  const sitterStatus = {
    approved: Approved,
    waitingforapproval: WaitingForApproval,
    rejected: Rejected,
  };

  const getStatusComponent = (status) => {
    const statusKey = status?.replace(/\s+/g, "").toLowerCase();
    const StatusComponent = sitterStatus[statusKey];
    return StatusComponent ? <StatusComponent /> : status;
  };

  function ImageChange({ setPreview }) {
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
        accept="image/jpeg, image/png, image/jpg"
      />
    );
  }

  async function uploadGalleryImage(e, folder) {
    const files = e.target.files;
    for (const file of files) {
      if (file.size <= 2 * 1024 * 1024) {
        const fileName = uuidv4();
        const { data, error } = await supabase.storage
          .from("sitters_gallery")
          .upload(`${folder}/${fileName}`, file); // Upload each file individually

        getImages();

        if (error) {
          console.error("Error uploading image:", error);
          throw error;
        }
      } else {
        alert("File size should not exceed 2 MB.");
      }
    }
  }

  async function uploadProfileImage(file, folder) {
    const fileName = uuidv4();
    const { data, error } = await supabase.storage
      .from("sitters")
      .upload(`${folder}/${fileName}`, file);
    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    } else {
      if (profile.profile_image_url) {
        const existingProfileImage = profile.profile_image_url;
        const urlParts = existingProfileImage.split("/");
        const existingFileName = urlParts[urlParts.length - 1];
        if (fileName !== existingFileName) {
          const { data, error } = await supabase.storage
            .from("sitters")
            .remove([`profile_image/${existingFileName}`]);

          if (error) {
            console.error("Error deleting old image:", error);
            throw error;
          }
        }
      }
      const url = supabase.storage
        .from("sitters")
        .getPublicUrl(`profile_image/${fileName}`).data.publicUrl;
      return url;
    }
  }

  let error;

  async function updateProfile(values) {
    error = validateRequiredAddress(values?.sitters_addresses);
    if (storageImages.length > 10) {
      return alert("You can upload a maximum of 10 gallery images.");
    }

    if (storageImages.length < 3) {
      return alert("Please upload a minimum of 3 gallery images.");
    }

    if (values.profile_image_url.size > 2 * 1024 * 1024) {
      return alert("Profile image should not exceed 2 MB.");
    }

    try {
      if (Object.keys(error).length > 0) {
        return;
      }
      // Upload profile image if it exists
      let profileImageUrl = null;
      if (
        values.profile_image_url !== profile.profile_image_url ||
        values.profile_image_url === null
      ) {
        profileImageUrl = await uploadProfileImage(
          values.profile_image_url,
          "profile_image"
        );
      } else {
        profileImageUrl = profile.profile_image_url;
      }

      // Upload gallery images
      const galleryImageUrls = [];
      storageImages.map((image) => {
        return galleryImageUrls.push(CDNURL + profile.id + "/" + image.name);
      });

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
  }

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={Yup.object({
        profile_image_url: Yup.mixed(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          ...values,
          sitters_addresses: { ...address, lat: searchLat, lng: searchLng },
        };
        updateProfile(data);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => {
        return (
          <Form className="flex flex-col gap-6">
            <div className="text-h3 flex justify-between">
              <div className="flex items-center gap-6">
                <p className="text-h3">Pet Sitter Profile</p>
                {getStatusComponent(profile?.sitter_status)}
              </div>
              {profile.sitter_status === null ||
              profile.sitter_status === "rejected" ? (
                <ButtonOrange
                  type="submit"
                  disabled={isSubmitting}
                  id="Request for approval"
                  text="Request for approval"
                  width="w-fit text-[16px]"
                />
              ) : profile.sitter_status === "approved" ||
                profile.sitter_status === "waiting for approval" ? (
                <ButtonOrange
                  type="submit"
                  disabled={isSubmitting}
                  id="Update"
                  text="Update"
                  width="w-fit text-[16px]"
                />
              ) : null}
            </div>
            {profile.sitter_status === "rejected" ? (
              <div className="w-full h-[52px] bg-ps-gray-200 text-ps-red rounded-lg flex items-center pl-3 gap-[10px]">
                <Image src={iconExclamation} width={20} height={20} />
                Your request has not been approved: ‘Admin’s suggestion here’
              </div>
            ) : null}

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
                    <option value="0-2 Years" label="0-2 Years" />
                    <option value="3-5 Years" label="3-5 Years" />
                    <option value="5+ Years" label="5+ Years" />
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
                    profile={profile}
                    uploadGalleryImage={uploadGalleryImage}
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
                name="sitters_addresses"
                existingAddress={profile.sitters_addresses}
                error={error}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import { useUser } from "@/context/User";
import AlertTop from "@/components/alerts/AlertTop";

const API_POST_PET = "/api/owner/${id}/pet";

export default function CreatePetForm() {
  const router = useRouter();
  const { userInfo } = useUser();
  const id = userInfo?.id;

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const initialValues = {
    pet_image_url: null,
    name: "",
    type: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    weight: "",
    description: "",
  };

  const validateRequired = (value) => {
    let error;
    if (!value || value === "") {
      error = "Required";
    }
    return error;
  };

  const handleImageChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2 MB.");
      return;
    }

    setFieldValue("pet_image_url", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSuccess("Upload image successful.");
    }
  };

  const onSubmit = async (values, actions) => {
    try {
      let publicImageUrl = null;
      const file = values.pet_image_url;

      if (file) {
        const fileName = uuidv4();

        const { data: petImage, error: imageError } = await supabase.storage
          .from("pets")
          .upload(`pet_image/${fileName}`, file);

        if (imageError) {
          setError("Error uploading image");
          return;
        }

        const publicUrlResponse = supabase.storage
          .from("pets/pet_image")
          .getPublicUrl(fileName);

        publicImageUrl = publicUrlResponse.data.publicUrl;
      }

      const updatedValues = {
        ...values,
        pet_image_url: publicImageUrl,
        owner_id: id,
      };

      const response = await axios.post(`${API_POST_PET}`, updatedValues);

      setSuccess("Create pet successful");

      router.back();
    } catch {
      setError("Error create pet");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="w-full">
          <div className="flex w-full flex-col gap-10 max-sm:gap-4">
            {/* upload image */}
            <div className="relative w-[240px] h-[240px] max-md:w-[120px] max-md:h-[120px]">
              {preview ? (
                <Image
                  src={preview}
                  alt="pet_image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  priority
                />
              ) : (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="cursor-pointer w-full h-full"
                >
                  <Image
                    src="/assets/pets/pet-dummy.svg"
                    alt="Dummy Pet Image"
                    className=""
                    width={240}
                    height={240}
                  />
                </div>
              )}
              <input
                className="absolute w-full h-full opacity-0 cursor-pointer"
                type="file"
                ref={fileInputRef}
                name="image"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                accept="image/*"
                style={{ display: "none" }}
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="absolute z-10 bottom-0 right-0 cursor-pointer"
              >
                <Image
                  src="/assets/icons/icon-plus.svg"
                  alt="upload"
                  width={60}
                  height={60}
                  className="max-md:w-[40px] max-md:h-[40px]"
                />
              </div>
            </div>
            {/* Pet Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-[16px] font-bold pb-1 flex">
                Pet Name*
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-ps-red text-b3"
                />
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                validate={validateRequired}
                className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                placeholder="Name of your pet"
              />
            </div>
            <div className="flex max-sm:flex-col  justify-between gap-2 max-sm:w-full max-sm:gap-4">
              {/* Pet Type */}
              <div className="flex flex-col max-sm:w-full w-[48%]">
                <label htmlFor="type" className="flex text-[16px] font-bold">
                  Pet Type*
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>

                <Field
                  as="select"
                  id="type"
                  name="type"
                  validate={validateRequired}
                  className="select select-bordered max-sm:w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
                >
                  <option value="">Select your pet type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                </Field>
              </div>
              {/* Breed */}
              <div className="flex flex-col w-[48%] max-sm:w-full">
                <label
                  htmlFor="breed"
                  className="flex text-[16px] font-bold pb-1"
                >
                  Breed*
                  <ErrorMessage
                    name="breed"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>
                <Field
                  type="text"
                  id="breed"
                  name="breed"
                  validate={validateRequired}
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg max-sm:w-full"
                  placeholder="Breed of your pet"
                />
              </div>
            </div>

            <div className="flex max-sm:flex-col justify-between max-sm:gap-4">
              {/* Sex */}
              <div className="flex flex-col w-[48%] max-sm:w-full">
                <label htmlFor="sex" className="flex text-[16px] font-bold">
                  Sex*
                  <ErrorMessage
                    name="sex"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>
                <Field
                  as="select"
                  id="sex"
                  name="sex"
                  validate={validateRequired}
                  className="select select-bordered max-sm:w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
                >
                  <option value="">Select sex of your pet</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
              </div>
              {/* Age */}
              <div className="flex flex-col w-[48%] max-sm:w-full">
                <label
                  htmlFor="age"
                  className="flex text-[16px] font-bold pb-1"
                >
                  Age (Months)*
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>
                <Field
                  type="number"
                  id="age"
                  name="age"
                  validate={validateRequired}
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg max-sm:w-full"
                  placeholder="Age of your pet"
                  min="1"
                />
              </div>
            </div>

            <div className="flex max-sm:flex-col justify-between max-sm:gap-4">
              {/* Color */}
              <div className="flex flex-col w-[48%] max-sm:w-full">
                <label
                  htmlFor="color"
                  className="flex text-[16px] font-bold pb-1"
                >
                  Color*
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>
                <Field
                  type="text"
                  id="color"
                  name="color"
                  validate={validateRequired}
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg max-sm:w-full"
                  placeholder="Describe color of your pet"
                />
              </div>
              {/* Weight */}
              <div className="flex flex-col w-[48%] max-sm:w-full">
                <label
                  htmlFor="weight"
                  className="flex text-[16px] font-bold pb-1"
                >
                  Weight (Kilogram)*
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>
                <Field
                  type="number"
                  id="weight"
                  name="weight"
                  validate={validateRequired}
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg max-sm:w-full"
                  placeholder="Weight of your pet"
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="description"
                className="text-[16px] font-bold pb-1"
              >
                About
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="border-[#DCDFED] text-[#7B7E8F] rounded-lg h-[140px]"
                placeholder="Describe more about your pet..."
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <ButtonOrangeLight
                text="Cancel"
                type="button"
                onClick={() => router.back()}
              />
              <ButtonOrange
                text={isSubmitting ? "Creating..." : "Create Pet"}
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* alert */}
          {error && <AlertTop type="error" text={error} />}
          {success && <AlertTop type="success" text={success} />}
        </Form>
      )}
    </Formik>
  );
}

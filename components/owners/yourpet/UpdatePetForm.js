import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";

const API_URL = "/api/owners";

export default function UpdatePetForm() {
  const router = useRouter();
  const { id, petId } = router.query;

  const [pet, setPet] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}/${petId}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    if (id && petId) {
      fetchPet();
    }
  }, [id, petId]);

  const initialValues = {
    pet_image_url: pet?.pet_image_url || null,
    name: pet?.name || "",
    type: pet?.type || "",
    breed: pet?.breed || "",
    sex: pet?.sex || "",
    age: pet?.age || "",
    color: pet?.color || "",
    weight: pet?.weight || "",
    description: pet?.description || "",
  };

  const validateRequired = (value) => (!value ? "Required" : undefined);

  const handleImageChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2 MB.");
      return;
    }

    setError(null);
    setFieldValue("pet_image_url", file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values, actions) => {
    try {
      const fileName = uuidv4();
      const file = values.pet_image_url;

      const { data: petImage, error: imageError } = await supabase.storage
        .from("pets")
        .upload(`pet_image/${fileName}`, file);

      if (imageError) {
        console.error("Error uploading image:", imageError.message);
        return;
      }

      const publicImageUrl = supabase.storage
        .from("pets/pet_image")
        .getPublicUrl(fileName);

      const updatedValues = {
        ...values,
        pet_image_url: publicImageUrl.data.publicUrl,
        owner_id: id,
      };

      await axios.put(`${API_URL}/${id}/${petId}`, updatedValues);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
      console.error("Error updating pet:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}/${petId}`);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  if (!pet) {
    return <p>Loading...</p>;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="w-full h-fit sm:shadow-lg rounded-xl bg-ps-white max-sm:bg-ps-gray-100 p-10">
          <div className="flex w-full flex-col gap-10 max-sm:gap-4">
            <button
              type="button"
              className="flex items-center gap-2 mb-3"
              onClick={() => router.back()}
            >
              <Image
                src="/assets/icons/icon-previous.svg"
                alt="icon-previous"
                width={24}
                height={24}
              />
              <p className="flex text-h3 gap-2">Your Pet</p>
            </button>
            {/* Upload Image */}
            <div className="relative w-[240px] h-[240px]">
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
                placeholder="John Wick"
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
                  min="1"
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

            {/* delete pet */}
            <button
              className="flex gap-2 items-center max-sm:justify-center max-sm:my-3"
              onClick={handleDelete}
            >
              <Image
                src="/assets/icons/icon-bin.svg"
                alt="Delete Pet Icon"
                width={18}
                height={20}
              />
              <p className="text-ps-orange-500 text-b2">Delete Pet</p>
            </button>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <button
                type="button"
                className="w-[127px] bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px] max-sm:w-[163px]"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px] max-sm:w-[163px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Pet"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

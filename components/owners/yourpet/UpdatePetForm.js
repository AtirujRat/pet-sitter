import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import axios from "axios";
<<<<<<< HEAD

export default function UpdatePetForm() {
  const router = useRouter();
  const { Id, petId } = router.query;

  const [initialValues, setInitialValues] = useState({
    name: "",
    pet_type: "",
=======
=======
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
>>>>>>> b87b3ee (feat: create api get pet)

const onSubmit = async (values, actions) => {
  try {
    // Perform the update operation here
    const { data, error } = await supabase
      .from("pets")
      .update(values)
      .eq("id", values.petId)
      .eq("owner_id", values.ownerId);

    if (error) {
      console.error("Error updating pet data:", error);
    } else {
      console.log("Pet data updated successfully:", data);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
  actions.setSubmitting(false);
};

function validateRequired(value) {
  let error;
  if (value === undefined || value === null || value === "") {
    error = " Required";
  }
  return error;
}
=======
>>>>>>> 6fecf16 (feat: create api update pet)

export default function UpdatePetForm() {
<<<<<<< HEAD
  const initialValues = {
    petName: "",
    petType: "",
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  const router = useRouter();
  const { Id, petId } = router.query;

  const [initialValues, setInitialValues] = useState({
    name: "",
    pet_type: "",
>>>>>>> b87b3ee (feat: create api get pet)
    breed: "",
    sex: "",
    age: "",
    color: "",
    weight: "",
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
    description: "",
  });

  useEffect(() => {
    const fetchPetData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      if (Id && petId) {
=======
      if (ownerId && petId) {
>>>>>>> b87b3ee (feat: create api get pet)
=======
      if (Id && petId) {
>>>>>>> 6fecf16 (feat: create api update pet)
        const { data, error } = await supabase
          .from("pets")
          .select(
            `
            name,
            pet_type,
            breed,
            sex,
            age,
            color,
            weight,
            description
          `
          )
          .eq("owner_id", ownerId)
          .eq("id", petId)
          .single();

        if (error) {
<<<<<<< HEAD
<<<<<<< HEAD
          console.error("Error fetching pet data:", error.message);
=======
          console.error("Error fetching pet data:", error);
>>>>>>> b87b3ee (feat: create api get pet)
=======
          console.error("Error fetching pet data:", error.message);
>>>>>>> 6fecf16 (feat: create api update pet)
        } else {
          setInitialValues(data);
        }
      }
    };

    fetchPetData();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6fecf16 (feat: create api update pet)
  }, [Id, petId]);

  const onSubmit = async (values, actions) => {
    const { Id, petId } = router.query;

    try {
      const response = await axios.put(`/api/owners/${Id}/pets`, values);

      console.log("Pet updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating pet:", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  function validateRequired(value) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }
<<<<<<< HEAD

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
=======
    about: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  }, [ownerId, petId]);
=======
>>>>>>> 6fecf16 (feat: create api update pet)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
>>>>>>> b87b3ee (feat: create api get pet)
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-[75%] h-fit shadow-lg rounded-xl bg-ps-white p-10">
          <div className="flex flex-col gap-10">
            <p className="flex text-h3 gap-2">Your Pet</p>
            {/* Image */}
            <div className="cursor-pointer w-fit h-fit">
              <Image
                src="/assets/pets/pet-dummy.svg"
                alt="Dummy Pet Image"
                width={240}
                height={240}
              />
            </div>
            {/* Pet Name */}
            <div className="max-sm:hidden flex flex-col">
<<<<<<< HEAD
<<<<<<< HEAD
              <label htmlFor="name" className="text-[16px] font-bold pb-1 flex">
                Pet Name*
                <ErrorMessage
                  name="name"
=======
              <label
                htmlFor="petName"
                className="text-[16px] font-bold pb-1 flex"
              >
                Pet Name*
                <ErrorMessage
                  name="petName"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
              <label htmlFor="name" className="text-[16px] font-bold pb-1 flex">
                Pet Name*
                <ErrorMessage
                  name="name"
>>>>>>> b87b3ee (feat: create api get pet)
                  component="div"
                  className="text-ps-red text-b3"
                />
              </label>
              <Field
                type="text"
<<<<<<< HEAD
<<<<<<< HEAD
                id="name"
                name="name"
=======
                id="petName"
                name="petName"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                id="name"
                name="name"
>>>>>>> b87b3ee (feat: create api get pet)
                validate={validateRequired}
                className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                placeholder="John Wick"
              />
            </div>

            <div className="flex justify-between">
              {/* Pet Type */}
              <div className="flex flex-col w-[48%]">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
                <label
                  htmlFor="pet_type"
                  className="flex text-[16px] font-bold"
                >
<<<<<<< HEAD
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
=======
                <label htmlFor="petType" className="flex text-[16px] font-bold">
                  Pet Type*
                  <ErrorMessage
                    name="petType"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
>>>>>>> b87b3ee (feat: create api get pet)
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>

                <Field
                  as="select"
<<<<<<< HEAD
<<<<<<< HEAD
                  id="pet_type"
                  name="pet_type"
=======
                  id="petType"
                  name="petType"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                  id="pet_type"
                  name="pet_type"
>>>>>>> b87b3ee (feat: create api get pet)
                  validate={validateRequired}
                  className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
                >
                  <option value="">Select your pet type</option>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
<<<<<<< HEAD
=======
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> b87b3ee (feat: create api get pet)
                </Field>
              </div>
              {/* Breed */}
              <div className="flex flex-col w-[48%]">
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
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                  placeholder="Breed of your pet"
                />
              </div>
            </div>

            <div className="flex justify-between">
              {/* Sex */}
              <div className="flex flex-col w-[48%]">
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
                  className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
                >
                  <option value="">Select sex of your pet</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
              </div>
              {/* Age */}
              <div className="flex flex-col w-[48%]">
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
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                  placeholder="Age of your pet"
                  min="1"
                />
              </div>
            </div>

            <div className="flex justify-between">
              {/* Color */}
              <div className="flex flex-col w-[48%]">
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
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                  placeholder="Describe color of your pet"
                />
              </div>
              {/* Weight */}
              <div className="flex flex-col w-[48%]">
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
                  className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                  placeholder="Weight of your pet"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col w-full">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
              <label
                htmlFor="description"
                className="text-[16px] font-bold pb-1"
              >
                Description
<<<<<<< HEAD
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
=======
              <label htmlFor="about" className="text-[16px] font-bold pb-1">
                About
              </label>
              <Field
                as="textarea"
                id="about"
                name="about"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
>>>>>>> b87b3ee (feat: create api get pet)
                className="border-[#DCDFED] text-[#7B7E8F] rounded-lg h-[140px]"
                placeholder="Describe more about your pet..."
              />
            </div>

            {/* delete pet */}
            <div className="flex gap-2 items-center cursor-pointer">
              <Image
                src="/assets/icons/icon-bin.svg"
<<<<<<< HEAD
<<<<<<< HEAD
                alt="Delete Pet Icon"
=======
                alt="Dummy Pet Image"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                alt="Delete Pet Icon"
>>>>>>> b87b3ee (feat: create api get pet)
                width={18}
                height={20}
              />
              <p className="text-ps-orange-500 text-b2">Delete Pet</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <button
                type="button"
                className="w-[127px] bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]"
<<<<<<< HEAD
<<<<<<< HEAD
                onClick={() => router.back()} // Navigate back on cancel
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                onClick={() => router.back()} // Navigate back on cancel
>>>>>>> b87b3ee (feat: create api get pet)
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]"
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

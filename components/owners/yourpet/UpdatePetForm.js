import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";

export default function UpdatePetForm() {
  const router = useRouter();
  const { Id, petId } = router.query;
=======

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

export default function UpdatePetForm() {
  const router = useRouter();
  const { ownerId, petId } = router.query;
>>>>>>> 3403445 (feat: create api get pet)
=======
import axios from "axios";

export default function UpdatePetForm() {
  const router = useRouter();
  const { Id, petId } = router.query;
>>>>>>> 7a4243e (feat: create api update pet)

  const [initialValues, setInitialValues] = useState({
    name: "",
    pet_type: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    weight: "",
    description: "",
  });

  useEffect(() => {
    const fetchPetData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      if (Id && petId) {
=======
      if (ownerId && petId) {
>>>>>>> 3403445 (feat: create api get pet)
=======
      if (Id && petId) {
>>>>>>> 7a4243e (feat: create api update pet)
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
>>>>>>> 3403445 (feat: create api get pet)
=======
          console.error("Error fetching pet data:", error.message);
>>>>>>> 7a4243e (feat: create api update pet)
        } else {
          setInitialValues(data);
        }
      }
    };

    fetchPetData();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7a4243e (feat: create api update pet)
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
<<<<<<< HEAD
=======
  }, [ownerId, petId]);
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> 7a4243e (feat: create api update pet)

  function validateRequired(value) {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
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

            <div className="flex justify-between">
              {/* Pet Type */}
              <div className="flex flex-col w-[48%]">
                <label
                  htmlFor="pet_type"
                  className="flex text-[16px] font-bold"
                >
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>

                <Field
                  as="select"
                  id="pet_type"
                  name="pet_type"
                  validate={validateRequired}
                  className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
                >
                  <option value="">Select your pet type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
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
              <label
                htmlFor="description"
                className="text-[16px] font-bold pb-1"
              >
                Description
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
            <div className="flex gap-2 items-center cursor-pointer">
              <Image
                src="/assets/icons/icon-bin.svg"
                alt="Delete Pet Icon"
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
                onClick={() => router.back()} // Navigate back on cancel
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

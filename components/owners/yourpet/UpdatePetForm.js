import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useRouter } from "next/router";
>>>>>>> 8ff4edd (refactor: edit update pet form)
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "/api/owners";

export default function UpdatePetForm() {
  const router = useRouter();
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

const onSubmit = (values, actions) => {
  console.log(values);
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
<<<<<<< HEAD

=======
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

>>>>>>> 3403445 (feat: create api get pet)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b87b3ee (feat: create api get pet)
=======

const onSubmit = (values, actions) => {
  console.log(values);
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======

const onSubmit = (values, actions) => {
  console.log(values);
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> b87b3ee (feat: create api get pet)
  actions.setSubmitting(false);
};

function validateRequired(value) {
  let error;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  if (value === undefined || value === null || value === "") {
=======
  if (!value === undefined || value === null || value === "") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  if (value === undefined || value === null || value === "") {
>>>>>>> b87b3ee (feat: create api get pet)
=======
  if (!value === undefined || value === null || value === "") {
>>>>>>> 0333687 (feat: edit update pet form)
=======
  if (value === undefined || value === null || value === "") {
>>>>>>> 3403445 (feat: create api get pet)
=======
  if (!value === undefined || value === null || value === "") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  if (value === undefined || value === null || value === "") {
>>>>>>> b87b3ee (feat: create api get pet)
    error = " Required";
  }
  return error;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> 6fecf16 (feat: create api update pet)
=======
import axios from "axios";
>>>>>>> 7a4243e (feat: create api update pet)
=======
import axios from "axios";
>>>>>>> 6fecf16 (feat: create api update pet)

export default function UpdatePetForm() {
<<<<<<< HEAD
<<<<<<< HEAD
  const router = useRouter();
<<<<<<< HEAD
  const { ownerId, petId } = router.query;
>>>>>>> 3403445 (feat: create api get pet)
=======
=======
import { useRouter } from "next/router";
>>>>>>> 8ff4edd (refactor: edit update pet form)
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "/api/owners";

export default function UpdatePetForm() {
  const router = useRouter();
<<<<<<< HEAD
<<<<<<< HEAD
  const { Id, petId } = router.query;
>>>>>>> 7a4243e (feat: create api update pet)
=======
  const router = useRouter();
  const { ownerId, petId } = router.query;
>>>>>>> b87b3ee (feat: create api get pet)
=======
  const { Id, petId } = router.query;
>>>>>>> 6fecf16 (feat: create api update pet)

  const [initialValues, setInitialValues] = useState({
    name: "",
    pet_type: "",
<<<<<<< HEAD
=======
  const initialValues = {
    petName: "",
    petType: "",
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======

export default function UpdatePetForm() {
<<<<<<< HEAD
  const initialValues = {
    petName: "",
    petType: "",
>>>>>>> 0333687 (feat: edit update pet form)
=======
  const router = useRouter();
  const { Id, petId } = router.query;

  const [initialValues, setInitialValues] = useState({
    name: "",
    pet_type: "",
>>>>>>> 3403445 (feat: create api get pet)
=======

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> b87b3ee (feat: create api get pet)
    description: "",
  });

  useEffect(() => {
    const fetchPetData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      if (Id && petId) {
=======
      if (ownerId && petId) {
>>>>>>> 3403445 (feat: create api get pet)
=======
      if (Id && petId) {
>>>>>>> 7a4243e (feat: create api update pet)
=======
      if (ownerId && petId) {
>>>>>>> b87b3ee (feat: create api get pet)
=======
      if (Id && petId) {
>>>>>>> 6fecf16 (feat: create api update pet)
=======
      if (ownerId && petId) {
>>>>>>> 3403445 (feat: create api get pet)
=======
      if (Id && petId) {
>>>>>>> 7a4243e (feat: create api update pet)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          console.error("Error fetching pet data:", error.message);
=======
          console.error("Error fetching pet data:", error);
>>>>>>> 3403445 (feat: create api get pet)
=======
          console.error("Error fetching pet data:", error.message);
>>>>>>> 7a4243e (feat: create api update pet)
=======
          console.error("Error fetching pet data:", error);
>>>>>>> b87b3ee (feat: create api get pet)
=======
          console.error("Error fetching pet data:", error.message);
>>>>>>> 6fecf16 (feat: create api update pet)
=======
          console.error("Error fetching pet data:", error);
>>>>>>> 3403445 (feat: create api get pet)
=======
          console.error("Error fetching pet data:", error.message);
>>>>>>> 7a4243e (feat: create api update pet)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7a4243e (feat: create api update pet)
=======
>>>>>>> 6fecf16 (feat: create api update pet)
  }, [Id, petId]);
=======
  const { petId } = router.query;
=======
  const { id, petId } = router.query;
>>>>>>> 9dc1fd7 (refactor: update api pets)

  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}/${petId}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [petId]);

  const initialValues = {
    name: pet ? pet.name : "",
    type: pet ? pet.type : "",
    breed: pet ? pet.breed : "",
    sex: pet ? pet.sex : "",
    age: pet ? pet.age : "",
    color: pet ? pet.color : "",
    weight: pet ? pet.weight : "",
    description: pet ? pet.description : "",
=======
  const { petId } = router.query;
=======
  const { id, petId } = router.query;
>>>>>>> 9dc1fd7 (refactor: update api pets)

  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}/${petId}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [petId]);

  const initialValues = {
<<<<<<< HEAD
    name: pet?.name || "",
    type: pet?.type || "",
    breed: pet?.breed || "",
    sex: pet?.sex || "",
    age: pet?.age || "",
    color: pet?.color || "",
    weight: pet?.weight || "",
    description: pet?.description || "",
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
    name: pet ? pet.name : "",
    type: pet ? pet.type : "",
    breed: pet ? pet.breed : "",
    sex: pet ? pet.sex : "",
    age: pet ? pet.age : "",
    color: pet ? pet.color : "",
    weight: pet ? pet.weight : "",
    description: pet ? pet.description : "",
>>>>>>> 9dc1fd7 (refactor: update api pets)
  };

  const validateRequired = (value) => {
    let error;
    if (!value || value === "") {
      error = "Required";
    }
    return error;
  };
<<<<<<< HEAD
>>>>>>> 8ff4edd (refactor: edit update pet form)

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/${petId}`, values);
      console.log("Response:", response.data);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
      console.error("Error updating pet:", error);
=======
=======
>>>>>>> 6fecf16 (feat: create api update pet)
  }, [Id, petId]);
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/${petId}`, values);
      console.log("Response:", response.data);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error updating pet:", error.message);
<<<<<<< HEAD
>>>>>>> 7a4243e (feat: create api update pet)
=======
>>>>>>> 6fecf16 (feat: create api update pet)
=======
      console.error("Error updating pet:", error);
>>>>>>> 8ff4edd (refactor: edit update pet form)
    } finally {
      actions.setSubmitting(false);
    }
  };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  }, [ownerId, petId]);
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> 7a4243e (feat: create api update pet)
=======
>>>>>>> 6fecf16 (feat: create api update pet)

  const onDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${id}/${petId}`);
      console.log("Pet deleted:", response.data);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${id}/${petId}`);
      console.log("Pet deleted:", response.data);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  if (!pet) {
    return <p>Loading...</p>;
  }
<<<<<<< HEAD
=======
=======
>>>>>>> 6fecf16 (feat: create api update pet)

  if (!pet) {
    return <p>Loading...</p>;
  }
<<<<<<< HEAD
>>>>>>> 7a4243e (feat: create api update pet)
=======
>>>>>>> 6fecf16 (feat: create api update pet)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
    about: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  }, [ownerId, petId]);
=======
>>>>>>> 6fecf16 (feat: create api update pet)

  return (
=======
  }, [ownerId, petId]);

  return (
>>>>>>> 3403445 (feat: create api get pet)
=======
  }, [ownerId, petId]);

  return (
>>>>>>> b87b3ee (feat: create api get pet)
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> b87b3ee (feat: create api get pet)
      {({ isSubmitting, errors, touched }) => (
=======
      {({ isSubmitting }) => (
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
      {({ isSubmitting, errors, touched }) => (
>>>>>>> 0333687 (feat: edit update pet form)
=======
      {({ isSubmitting, errors, touched }) => (
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
      {({ isSubmitting }) => (
>>>>>>> 8ff4edd (refactor: edit update pet form)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <label htmlFor="name" className="text-[16px] font-bold pb-1 flex">
                Pet Name*
                <ErrorMessage
                  name="name"
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
              <label
                htmlFor="petName"
                className="text-[16px] font-bold pb-1 flex"
              >
                Pet Name*
                <ErrorMessage
                  name="petName"
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
              <label htmlFor="name" className="text-[16px] font-bold pb-1 flex">
                Pet Name*
                <ErrorMessage
                  name="name"
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
              <label htmlFor="name" className="text-[16px] font-bold pb-1 flex">
                Pet Name*
                <ErrorMessage
                  name="name"
>>>>>>> 3403445 (feat: create api get pet)
=======
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                id="petName"
                name="petName"
>>>>>>> 0333687 (feat: edit update pet form)
=======
                id="name"
                name="name"
>>>>>>> 3403445 (feat: create api get pet)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> b87b3ee (feat: create api get pet)
                <label
                  htmlFor="pet_type"
                  className="flex text-[16px] font-bold"
                >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
                <label htmlFor="petType" className="flex text-[16px] font-bold">
                  Pet Type*
                  <ErrorMessage
                    name="petType"
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
>>>>>>> b87b3ee (feat: create api get pet)
=======
                <label htmlFor="type" className="flex text-[16px] font-bold">
                  Pet Type*
                  <ErrorMessage
                    name="type"
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                  Pet Type*
                  <ErrorMessage
                    name="pet_type"
>>>>>>> b87b3ee (feat: create api get pet)
=======
                <label htmlFor="type" className="flex text-[16px] font-bold">
                  Pet Type*
                  <ErrorMessage
                    name="type"
>>>>>>> 8ff4edd (refactor: edit update pet form)
                    component="div"
                    className="text-ps-red text-b3"
                  />
                </label>

                <Field
                  as="select"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                  id="type"
                  name="type"
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
                  id="petType"
                  name="petType"
>>>>>>> 0333687 (feat: edit update pet form)
=======
                  id="pet_type"
                  name="pet_type"
>>>>>>> 3403445 (feat: create api get pet)
=======
                  id="petType"
                  name="petType"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                  id="pet_type"
                  name="pet_type"
>>>>>>> b87b3ee (feat: create api get pet)
=======
                  id="type"
                  name="type"
>>>>>>> 8ff4edd (refactor: edit update pet form)
                  validate={validateRequired}
                  className="select select-bordered w-full outline-none ring-0 border-[#DCDFED] text-[#7B7E8F] font-normal text-[16px]"
                >
                  <option value="">Select your pet type</option>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> b87b3ee (feat: create api get pet)
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  <option value="male">Male</option>
                  <option value="female">Female</option>
=======
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
>>>>>>> 0333687 (feat: edit update pet form)
=======
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                  <option value="male">Male</option>
                  <option value="female">Female</option>
>>>>>>> 9dc1fd7 (refactor: update api pets)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> b87b3ee (feat: create api get pet)
              <label
                htmlFor="description"
                className="text-[16px] font-bold pb-1"
              >
                Description
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
              <label htmlFor="about" className="text-[16px] font-bold pb-1">
                About
              </label>
              <Field
                as="textarea"
                id="about"
                name="about"
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
>>>>>>> 3403445 (feat: create api get pet)
=======
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <button className="flex gap-2 items-center" onClick={onDelete}>
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
=======
            <div className="flex gap-2 items-center cursor-pointer">
=======
            <button className="flex gap-2 items-center" onClick={onDelete}>
>>>>>>> 9dc1fd7 (refactor: update api pets)
              <Image
                src="/assets/icons/icon-bin.svg"
<<<<<<< HEAD
                alt="Dummy Pet Image"
>>>>>>> 0333687 (feat: edit update pet form)
=======
                alt="Delete Pet Icon"
>>>>>>> 3403445 (feat: create api get pet)
=======
            <div className="flex gap-2 items-center cursor-pointer">
              <Image
                src="/assets/icons/icon-bin.svg"
<<<<<<< HEAD
                alt="Dummy Pet Image"
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                alt="Delete Pet Icon"
>>>>>>> b87b3ee (feat: create api get pet)
                width={18}
                height={20}
              />
              <p className="text-ps-orange-500 text-b2">Delete Pet</p>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            </button>
=======
            </div>
>>>>>>> 0333687 (feat: edit update pet form)
=======
            </div>
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
            </button>
>>>>>>> 9dc1fd7 (refactor: update api pets)

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-between">
              <button
                type="button"
                className="w-[127px] bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                onClick={() => router.back()} // Navigate back on cancel
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                onClick={() => router.back()} // Navigate back on cancel
>>>>>>> b87b3ee (feat: create api get pet)
=======
                onClick={() => router.back()}
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
                onClick={() => router.back()} // Navigate back on cancel
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
                onClick={() => router.back()} // Navigate back on cancel
>>>>>>> b87b3ee (feat: create api get pet)
=======
                onClick={() => router.back()}
>>>>>>> 8ff4edd (refactor: edit update pet form)
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

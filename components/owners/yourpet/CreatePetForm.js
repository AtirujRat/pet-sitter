import { Formik, Form, Field, ErrorMessage } from "formik";
<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const API_URL = "/api/owners";

export default function CreatePetForm() {
  const router = useRouter();
  const { id } = router.query;

=======
=======
import axios from "axios";
import { useRouter } from "next/router";
>>>>>>> ef81c68 (feat: create pet)
import Image from "next/image";
import Link from "next/link";

const API_URL = "/api/owners/pets";

export default function CreatePetForm() {
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  const router = useRouter();
  const { id } = router.query;

<<<<<<< HEAD
  if (!id) {
    return <div>Loading...</div>;
  }

>>>>>>> 1919ac5 (feat: set path of pet list)
=======
>>>>>>> ef81c68 (feat: create pet)
  const initialValues = {
    name: "",
    type: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    weight: "",
    description: "",
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ef81c68 (feat: create pet)
  const validateRequired = (value) => {
    let error;
    if (!value || value === "") {
      error = "Required";
    }
    return error;
  };

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(`${API_URL}/${id}`, {
        ...values,
        owner_id: id,
      });

      console.log("Response:", response.data);
      router.push(`/owners/${id}/yourpet`);
    } catch (error) {
      console.error("Error creating pet:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

<<<<<<< HEAD
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> ef81c68 (feat: create pet)
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <Link href={`/owners/${id}/yourpet`}>
=======
=======
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
>>>>>>> 1d054ed (feat: edit update pet form)
              <Link href="/owners/yourpet">
>>>>>>> bf2cbb2 (feat: update create pet form)
=======
              <Link href={`/owners/${id}/yourpet`}>
>>>>>>> 1919ac5 (feat: set path of pet list)
                <button
                  type="button"
                  className="w-[127px] bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]"
                >
                  Cancel
                </button>
              </Link>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
              <button
                type="button"
                className="w-[127px] bg-ps-orange-100 text-ps-orange-500 text-[16px] font-bold rounded-full tracking-wide h-[48px]"
              >
                Cancel
              </button>
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> bf2cbb2 (feat: update create pet form)
=======
>>>>>>> d3a647f (feat: edit update pet form)
>>>>>>> 19e2e33 (feat: edit update pet form)
=======
>>>>>>> 1d054ed (feat: edit update pet form)
              <button
                type="submit"
                className="w-[127px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide h-[48px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Pet"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

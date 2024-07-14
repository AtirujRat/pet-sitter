import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useSitterForm } from "@/hook/useSitterForm";
import userimage from "../../../public/assets/navbar/usermock.svg";
import plus from "../../../public/assets/icon-plus.svg";

const SitterProfileForm = ({ profile = {} }) => {
  const router = useRouter();
  const { id } = router.query;
  const { initialValues, validate, onSubmit } = useSitterForm(id);

  // console.log(profile.profile_image_url);

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <div className="bg-ps-white rounded-2xl px-20 py-10 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <p className="text-ps-gray-300 text-h3">Basic Information</p>
              {/* Basic Information */}
              <label htmlFor="userimage">Profile Image</label>
              {profile.profile_image_url ? (
                <div className="relative w-[240px] h-[240px]">
                  <Image
                    src={profile.profile_image_url}
                    alt="userimage"
                    layout="fill"
                    objectFit="cover"
                    className=" rounded-full relative"
                    priority
                  />
                  <Image
                    src={plus}
                    alt="userimage"
                    width={60}
                    height={60}
                    className="absolute z-10 bottom-0 right-0 cursor-pointer"
                  />
                </div>
              ) : (
                <Image
                  src={userimage}
                  alt="userimage"
                  width={240}
                  height={240}
                />
              )}
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="full_name" className="text-b2">
                  Your full name*
                </label>
                <Field
                  placeHolder="12334455"
                  type="text"
                  name="full_name"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                <ErrorMessage
                  name="full_name"
                  component="div"
                  className="text-ps-red"
                />
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
                  <option value="0-2 year" label="0-2 year" />
                  <option value="3-5 years" label="3-5 years" />
                  <option value="5+ years" label="5+ years" />
                </Field>
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="text-ps-red"
                />
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
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-ps-red"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-b2">
                  Email*
                </label>
                <Field
                  type="email"
                  name="email"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-ps-red"
                />
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
                <ErrorMessage
                  name="introduction"
                  component="div"
                  className="text-ps-red"
                />
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
                <ErrorMessage
                  name="trade_name"
                  component="div"
                  className="text-ps-red"
                />
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="pet_type" className="text-b2">
                  Pet type
                </label>
                <Field
                  as="select"
                  name="pet_type"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                >
                  <option value="" label="Select pet type" />
                  <option value="dog" label="Dog" />
                  <option value="cat" label="Cat" />
                  <option value="Bird" label="Bird" />
                  <option value="Rabbit" label="Rabbit" />
                </Field>
                <ErrorMessage
                  name="pet_type"
                  component="div"
                  className="text-ps-red"
                />
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="introduction" className="text-b2">
                  Services (Describe all of your service for pet sitting)
                </label>
                <Field
                  as="textarea"
                  name="introduction"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                />
                <ErrorMessage
                  name="introduction"
                  component="div"
                  className="text-ps-red"
                />
              </div>
            </div>
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="introduction" className="text-b2">
                  My Place (Describe you place)
                </label>
                <Field
                  as="textarea"
                  name="introduction"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                />
                <ErrorMessage
                  name="introduction"
                  component="div"
                  className="text-ps-red"
                />
              </div>
            </div>
          </div>
          {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
        </Form>
      )}
    </Formik>
  );
};

export default SitterProfileForm;

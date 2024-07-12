import Image from "next/image";
import { useSitterForm } from "@/hook/useSitterForm";
import userimage from "../../../public/assets/navbar/usermock.svg";
import { Formik, Form, Field } from "formik";

const SitterProfileForm = () => {
  // const { id } = router.query;
  // const { initialValues, validate, onSubmit } = useSitterForm(id);
  return (
    <Formik>
      <Form className="flex flex-col gap-6">
        <div className="bg-ps-white rounded-2xl px-20 py-10 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <p className="text-ps-gray-300 text-h3">Basic Information</p>
            {/* Basic Information */}
            <label htmlFor="userimage">Profile Image</label>
            <Image src={userimage} alt="userimage" width={240} height={240} />
          </div>
          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label htmlFor="full_name" className="text-b2">
                Your full name*
              </label>
              <Field
                type="text"
                name="full_name"
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="experience" className="text-b2">
                Experience*
              </label>
              <Field
                type="select"
                name="experience"
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
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
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-b2">
                Email*
              </label>
              <Field
                type="select"
                name="email"
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              />
            </div>
          </div>
          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label htmlFor="introduction" className="text-b2">
                Introduction (Describe about yourself as pet sitter)
              </label>
              <Field
                type="text"
                name="introduction"
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px]"
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
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              />
            </div>
          </div>
          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label htmlFor="pet_type" className="text-b2">
                Pet type
              </label>
              <Field
                type="select"
                name="pet_type"
                className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400"
              />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SitterProfileForm;

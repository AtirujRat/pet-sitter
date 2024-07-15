import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useSitterForm } from "@/hook/useSitterForm";
import { useState, useRef } from "react";
import PhoneInput from "@/components/authentication/PhoneInput";
import userimage from "../../../public/assets/navbar/usermock.svg";
import plus from "../../../public/assets/icon-plus.svg";
import iconUpLoad from "../../../public/assets/sitters/icon-upload.svg";
import iconClose from "../../../public/assets/sitters/icon-close.svg";
import iconApproved from "../../../public/assets/sitters/icon-approved.svg";

const SitterProfileForm = ({ profile = {} }) => {
  const router = useRouter();
  const { id } = router.query;
  const { initialValues, validate, onSubmit } = useSitterForm(id);

  const initialFormValues = {
    ...initialValues,
    ...profile,
  };

  const ImageChange = () => {
    const [preview, setPreview] = useState(profile.profile_image_url || null);
    const [error, setError] = useState(null);
    const { setFieldValue } = useFormikContext();
    const fileInputRef = useRef(null);

    const handleImageChange = async (event) => {
      const file = event.currentTarget.files[0];

      if (file && file.size > 2 * 1024 * 1024) {
        // 2 MB
        setError("File size should not exceed 2 MB.");
        return;
      }

      setError(null);
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
      <div className="relative w-[240px] h-[240px]">
        {preview ? (
          <Image
            src={preview}
            alt="userimage"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <Image
            src={userimage}
            alt="userimage"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        )}
        <input
          className="absolute w-[60px] h-[60px] opacity-0 cursor-pointer"
          type="file"
          ref={fileInputRef}
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <div
          onClick={() => fileInputRef.current.click()}
          className="absolute z-10 bottom-0 right-0 cursor-pointer"
        >
          <Image src={plus} alt="upload" width={60} height={60} />
        </div>
      </div>
    );
  };

  const ImageGallery = () => {
    const [gallery, setGallery] = useState([]);
    const fileInputRef = useRef(null);

    const handleGalleryChange = async (event) => {
      const files = event.target.files;
      if (files.length + gallery.length > 10) {
        alert("You can only upload a maximum of 10 images.");
        return;
      }

      const newImages = [];
      for (const file of files) {
        if (file.size <= 2 * 1024 * 1024) {
          // Check file size
          const reader = new FileReader();
          reader.onloadend = () => {
            setGallery((prev) => [...prev, reader.result]);
          };
          reader.readAsDataURL(file);
        } else {
          alert("File size should not exceed 2 MB.");
        }
      }
    };

    const handleRemoveImage = (index) => {
      setGallery(gallery.filter((_, i) => i !== index));
    };

    return (
      <div className="flex flex-wrap gap-4">
        {gallery.map((image, index) => (
          <div key={index} className="relative w-[167px] h-[167px]">
            <Image
              src={image}
              alt={`Gallery image ${index}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div
              className="absolute w-[24px] h-[24px] top-0 right-0 translate-x-1 -translate-y-1 cursor-pointer rounded-full bg-ps-gray-400 flex items-center justify-center"
              onClick={() => handleRemoveImage(index)}
            >
              <Image src={iconClose} alt="remove" width={8} height={8} />
            </div>
          </div>
        ))}
        {gallery.length < 10 && (
          <div
            className="w-[167px] h-[167px] flex flex-col justify-center items-center bg-ps-orange-100 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              onChange={handleGalleryChange}
              accept="image/*"
              multiple
            />
            <Image src={iconUpLoad} width={40} height={40} />
            <p className="text-ps-orange-500 font-bold text-[16px] p-3">
              Upload Image
            </p>
          </div>
        )}
      </div>
    );
  };

const SitterProfileForm = () => {
  // const { id } = router.query;
  // const { initialValues, validate, onSubmit } = useSitterForm(id);
  return (
    <Formik
      initialValues={initialFormValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="flex flex-col gap-6">
          <div className="text-h3 flex justify-between">
            <div className="flex items-center gap-6">
              <p>Pet Sitter Profile</p>
              <p className="text-[16px] text-ps-green-500 flex text-center gap-2">
                <Image src={iconApproved} width={6} height={6} />
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
              <label htmlFor="userimage" className="text-b2">
                Profile Image
              </label>
              <ImageChange />
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
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.trade_name && touched.trade_name && (
                  <div className="text-ps-red">{errors.trade_name}</div>
                )}
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
                <label htmlFor="services_description" className="text-b2">
                  Services (Describe all of your service for pet sitting)
                </label>
                <Field
                  as="textarea"
                  name="services_description"
                  className="p-3 border-2 rounded-sm border-ps-gray-200 text-b2 font-normal text-ps-gray-400 h-[140px] focus:outline-none focus:ring-0"
                />
                {errors.services_description &&
                  touched.services_description && (
                    <div className="text-ps-red">
                      {errors.services_description}
                    </div>
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
                <label htmlFor="introduction" className="text-b2">
                  Image Gallery (Maximum 10 images)
                </label>
                <ImageGallery />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SitterProfileForm;

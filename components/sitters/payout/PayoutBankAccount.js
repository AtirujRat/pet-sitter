import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import axios from "axios";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import back from "/public/assets/icons/icon-previous.svg";
import Link from "next/link";
import Loading from "@/components/Loading";
import plus from "@/public/assets/icon-plus.svg";
import ImageInput from "./ImageInput";

export default function PayoutBankAccount({
  id,
  loading,
  preview,
  setPreview,
  bankAccount,
}) {
  const router = useRouter();
  const initialValues = bankAccount
    ? {
        book_bank_image: bankAccount.book_bank_image_url,
        account_number: bankAccount.account_number,
        account_name: bankAccount.account_name,
        bank_id: bankAccount.bank_id,
      }
    : {
        book_bank_image: null,
        account_number: "",
        account_name: "",
        bank_id: "",
      };

  async function handleSubmittingForm(values, actions) {
    try {
      let imageUrl = values.book_bank_image || null;

      // Upload image
      if (
        !bankAccount ||
        values.book_bank_image !== bankAccount.book_bank_image_url
      ) {
        const fileName = uuidv4();
        const { data, error } = await supabase.storage
          .from("sitters")
          .upload(`book_bank_image/${fileName}`, values.book_bank_image);
        if (error) {
          console.error("Error uploading image:", error);
          throw error;
        }
        // Get new URL
        imageUrl = supabase.storage
          .from("sitters")
          .getPublicUrl(`book_bank_image/${fileName}`).data.publicUrl;

        // Delete old image if exists
        if (bankAccount?.book_bank_image_url) {
          const existingProfileImage = bankAccount.book_bank_image_url;
          const urlParts = existingProfileImage.split("/");
          const existingFileName = urlParts[urlParts.length - 1];
          console.log("old file", existingFileName);
          if (fileName !== existingFileName) {
            const { data, error } = await supabase.storage
              .from("sitters")
              .remove([`book_bank_image/${existingFileName}`]);
            if (error) {
              console.error("Error deleting old image:", error);
              throw error;
            }
          }
        }
      }

      // PUT data
      const res = await axios.put(
        `http://localhost:3000/api/sitters/${id}/payout`,
        {
          ...values,
          book_bank_image: imageUrl,
        }
      );
      if (res.status === 200) {
        alert("Bank account was updated");
        actions.setSubmitting(false);
        router.reload();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(
        "An error occurred while updating the bank account. Please try again."
      );
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.account_name) {
      errors.account_name = "Required";
    }

    if (!values.account_number) {
      errors.account_number = "Required";
    } else if (!/^\d+$/.test(values.account_number)) {
      errors.account_number = "Account number must be a number";
    } else if (values.account_number.length < 10) {
      errors.account_number = "Account number must be at least 10 digits";
    }

    if (!values.book_bank_image) {
      errors.book_bank_image = "Required";
    }

    if (!values.bank_id) {
      errors.bank_id = "Required";
    }

    return errors;
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmittingForm}
    >
      {({ errors, touched, isSubmitting, setFieldValue, dirty }) => {
        return (
          <Form className="flex flex-col sm:gap-6 gap-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-6">
                <Link href={`/sitters/${id}/payout`}>
                  <Image src={back} alt="go back"></Image>
                </Link>
                <p className="md:text-h3 text-h4">Payout Option</p>
              </div>
              <div className="hidden sm:flex">
                <ButtonOrange
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  id="Update"
                  text={isSubmitting ? "Updating..." : "Update"}
                  width="w-fit"
                />
              </div>
            </div>

            <div className="bg-ps-white rounded-2xl px-4 md:px-10 lg:px-20 py-10 flex flex-col sm:gap-6 gap-4">
              <div className="flex flex-col sm:mb-10">
                <label htmlFor="book_bank_image" className="text-b2">
                  Book Bank Image*
                </label>
                {errors.book_bank_image && touched.book_bank_image ? (
                  <div className="text-ps-red">{errors.book_bank_image}</div>
                ) : null}

                <div className="gray-bg sm:w-[500px] sm:h-[480px] w-full h-[400px] bg-ps-gray-200 sm:mt-6 mt-4 rounded-lg relative">
                  {preview && (
                    <img
                      className="w-full h-full object-contain p-4"
                      src={preview}
                      alt="Preview"
                    />
                  )}
                  <div className="absolute bottom-3 right-3">
                    <Image
                      className="w-[60px] h-[60px]"
                      src={plus}
                      alt="upload image"
                    />
                    <Field
                      component={ImageInput}
                      setFieldValue={setFieldValue}
                      setPreview={setPreview}
                      name="book_bank_image"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex max-sm:flex-col sm:gap-10 gap-4">
                <div className="account-number flex flex-col w-full">
                  <label htmlFor="account-number" className="text-b2">
                    Bank Account Number*
                  </label>
                  <Field
                    type="text"
                    id="account-number"
                    name="account_number"
                    className="px-3 h-[48px] border rounded-lg border-ps-gray-200 text-base font-normal text-ps-black focus:outline-none focus:ring-0"
                  />
                  {errors.account_number && touched.account_number ? (
                    <div className="text-ps-red">{errors.account_number}</div>
                  ) : null}
                </div>
                <div className="account-name flex flex-col w-full">
                  <label htmlFor="account-name" className="text-b2">
                    Account Name*
                  </label>
                  <Field
                    type="text"
                    id="account-name"
                    name="account_name"
                    className="px-3 h-[48px] border rounded-lg border-ps-gray-200 text-base font-normal text-ps-black  focus:outline-none focus:ring-0"
                  />
                  {errors.account_name && touched.account_name ? (
                    <div className="text-ps-red">{errors.account_name}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full">
                <div className="flex flex-col sm:w-[50%] w-full sm:pr-5">
                  <label htmlFor="bank" className="text-b2">
                    Bank Name*
                  </label>
                  <Field
                    as="select"
                    id="bank"
                    name="bank_id"
                    className="px-3 h-[48px] border rounded-lg border-ps-gray-200 text-base font-normal text-ps-black focus:outline-none focus:ring-0"
                  >
                    <option value="" label="Select Bank" disabled selected />
                    <option value="1" label="KBANK" />
                    <option value="2" label="SCB" />
                    <option value="3" label="KTB" />
                    <option value="4" label="TTB" />
                    <option value="5" label="BBL" />
                    <option value="6" label="BAY" />
                  </Field>
                  {errors.bank_id && touched.bank_id ? (
                    <div className="text-ps-red">{errors.bank_id}</div>
                  ) : null}
                </div>
              </div>
            </div>
             {/* button mobile size */}
             <div className="sm:hidden flex justify-end">
             <ButtonOrange
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  id="Update"
                  text={isSubmitting ? "Updating..." : "Update"}
                  width="w-fit"
                />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

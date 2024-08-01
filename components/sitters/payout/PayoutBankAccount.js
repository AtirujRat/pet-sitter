import Image from "next/image";
import { Formik, Form, Field, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import axios from "axios";
import * as Yup from "yup";
import { useSearch } from "@/context/Search";
import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import back from "/public/assets/icons/icon-previous.svg";
import Link from "next/link";
import Loading from "@/components/Loading";
import plus from "@/public/assets/icon-plus.svg";
import AddImage from "./AddImage";

export default function PayoutBankAccount({
  profile = {},
  id,
  loading,
  preview,
  setPreview,
  bankAccount,
  setBankAccount,
  setLoading
}) {
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

  async function handleImageChange(event, setFieldValue) {
    const file = event.currentTarget.files[0];
    setFieldValue("book_bank_image", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmittingForm(values) {
    try {
      let imageUrl = bankAccount?.book_bank_image_url || null;

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
        // Delete old image if exists
        if (bankAccount?.book_bank_image_url) {
          const existingProfileImage = bankAccount.book_bank_image_url;
          const urlParts = existingProfileImage.split("/");
          const existingFileName = urlParts[urlParts.length - 1];
          console.log(existingFileName)
          const { data, error } = await supabase.storage
            .from("sitters")
            .remove([`book_bank_image/${existingFileName}`]);
          if (error) {
            console.error("Error deleting old image:", error);
            throw error;
          }
        }
        // Get new URL
        imageUrl = supabase.storage
          .from("sitters")
          .getPublicUrl(`book_bank_image/${fileName}`).data.publicUrl;
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
        setBankAccount(res.data[0])
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(
        "An error occurred while updating the bank account. Please try again."
      );
    }
  }

  const validate = (values) => {
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
  };

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
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleSubmittingForm(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form className="flex flex-col gap-6">
            <div className="text-h3 flex justify-between">
              <div className="flex items-center gap-6">
                <Link href={`/sitters/${id}/payout`}>
                  <Image src={back}></Image>
                </Link>
                <p className="md:text-h3 text-h4">Payout Option</p>
              </div>
              <div className="hidden sm:flex">
                <ButtonOrange
                  type="submit"
                  disabled={isSubmitting}
                  id="Update"
                  text={isSubmitting ? "Updating..." : "Update"}
                  width="w-fit text-[16px]"
                />
              </div>
            </div>

            <div className="bg-ps-white rounded-2xl px-4 md:px-10 lg:px-20 py-10 flex flex-col sm:gap-6 gap-4">
              <div className="flex flex-col mb-10">
                <label htmlFor="book_bank_image" className="text-b2">
                  Book Bank Image*
                </label>
                {errors.book_bank_image && touched.book_bank_image ? (
                  <div className="text-ps-red">{errors.book_bank_image}</div>
                ) : null}

                <div className="gray-bg w-[500px] h-[480px] bg-ps-gray-200 mt-6 rounded-lg relative">
                  {preview && (
                    <img
                      className="w-full h-full object-contain p-4"
                      src={preview}
                      alt="Preview"
                    />
                  )}
                  <div className="absolute bottom-3 right-3">
                    <Image
                      className="w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
                      src={plus}
                      alt="import button"
                    />
                    <input
                      className="w-[60px] h-[60px] opacity-0 absolute bottom-0"
                      type="file"
                      name="book_bank_image"
                      id="book_bank_image"
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                      accept="image/jpeg, image/png, image/jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:flex sm:gap-10">
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

              <div className="flex w-full gap-10">
                <div className="flex flex-col w-[50%] pr-5">
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
          </Form>
        );
      }}
    </Formik>
  );
}

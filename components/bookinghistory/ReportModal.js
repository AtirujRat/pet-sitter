import React, { useState } from "react";
import cross_icon from "@/public/assets/booking/cross.svg";
import Image from "next/image";
import {
  ButtonOrange,
  ButtonOrangeLight,
} from "@/components/buttons/OrangeButtons";
import { Form, Formik, Field } from "formik";
import axios from "axios";

function validateIssue(value) {
  let error;
  if (!value) {
    error = "Required";
  }

  return error;
}
function validateDescription(value) {
  let error;
  if (!value) {
    error = "Required";
  }

  return error;
}

export default function ReportModal(props) {
  const [error, setError] = useState(null);

  async function sendReportHandle(formData) {
    try {
      await axios.post("/api/reports/reports", {
        booking_id: props.bookingList[props.index].id,
        issue: formData.issue,
        description: formData.description,
        status: "New Report",
      });
      setError(null);
      props.setAlertText("Report has been sent.");
      props.closeModal();
      props.setConnection(true);
    } catch (error) {
      setError("Could not sent the report because database issue.");
    }
  }

  return (
    <Formik
      initialValues={{ issue: "", description: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        sendReportHandle(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="max-[768px]:absolute left-0 bottom-0 w-[100vw] h-[60vh] md:w-[800px] md:h-[720px] bg-ps-white rounded-t-2xl md:rounded-2xl">
          <div className="flex max-w-full justify-between border-b-[1px] border-ps-gray-200 py-[24px] px-[40px]">
            <h1 className="text-h3 text-ps-gray-600">Report</h1>
            <Image
              onClick={() => props.closeModal()}
              className="cursor-pointer"
              src={cross_icon}
              alt="cross icon"
            />
          </div>
          <div className="w-full flex flex-col h-[80%] md:h-[90%] justify-between py-[5px]  gap-[5px] md:gap-[40px] md:p-[40px] px-[16px] md:py-[40px]">
            <div className="flex flex-col gap-[10px] md:gap-[20px]">
              <div className="w-full flex flex-col gap-[5px]">
                <label className="text-b2">Issue</label>
                <Field
                  className="w-full rounded-lg border-ps-gray-200  focus:border-ps-gray-200 focus:ring-0"
                  type="text"
                  name="issue"
                  placeholder="Subject"
                  validate={validateIssue}
                />
                {errors.issue && touched.issue && (
                  <div className=" text-ps-red bg-transparent">
                    {errors.issue}
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <label className="text-b2">Description</label>
                <Field name="description" validate={validateDescription}>
                  {({ field }) => (
                    <textarea
                      className="w-full h-[140px] rounded-lg border-ps-gray-200  focus:border-ps-gray-200 focus:ring-0"
                      type="textarea"
                      placeholder="Describe detail..."
                      {...field}
                    />
                  )}
                </Field>
                {errors.description && touched.description && (
                  <div className="text-ps-red bg-transparent">
                    {errors.description}
                  </div>
                )}
                {error && <p className="text-ps-red">{error}</p>}
              </div>
            </div>
            <div className="flex justify-between ">
              <div onClick={() => props.closeModal()}>
                <ButtonOrangeLight width={"w-[120px]"} text={"Cancel"} />
              </div>
              <div>
                <ButtonOrange
                  width={"max-[768px]:w-[207px]"}
                  text={"Send Report"}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

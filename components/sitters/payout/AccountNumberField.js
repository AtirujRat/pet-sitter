import React from "react";
import { Field, useField } from "formik";

export default function AccountNumberField({ ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const formatBankAccountNumber = (value) => {
    // Remove all non-digit characters
    value = value.replace(/\D/g, "");
    // Format the value as xxx-x-xxxxx-x
    if (value.length > 3) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
    return value;
  };

  const handleChange = (e) => {
    const formattedValue = formatBankAccountNumber(e.target.value);
    setValue(formattedValue);
  };

  return (
    <div>
      <input
        {...field}
        {...props}
        value={field.value || ""}
        onChange={handleChange}
        className="px-3 h-[48px] w-full border rounded-lg border-ps-gray-200 text-base font-normal text-ps-black focus:outline-none focus:ring-0"
      />
      {meta.touched && meta.error ? (
        <div className="error text-ps-red">{meta.error}</div>
      ) : null}
    </div>
  );
}

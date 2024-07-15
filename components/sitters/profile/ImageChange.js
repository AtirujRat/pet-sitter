import Image from "next/image";
import { useField, useFormikContext } from "formik";
import { useState, useRef } from "react";
import userimage from "../../../public/assets/navbar/usermock.svg";
import plus from "../../../public/assets/icon-plus.svg";

const ImageChange = ({ field, form, setPreview, preview }) => {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2 MB.");
      return;
    }

    setError(null);
    form.setFieldValue(field.name, file);

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
          alt="Profile Preview"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
          priority // Add priority property here
        />
      ) : (
        <Image
          src={userimage}
          alt="Default User Image"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      )}
      <input
        className="absolute w-[60px] h-[60px] opacity-0 cursor-pointer"
        type="file"
        ref={fileInputRef}
        name={field.name}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <div
        onClick={() => fileInputRef.current.click()}
        className="absolute z-10 bottom-0 right-0 cursor-pointer"
      >
        <Image src={plus} alt="Upload Icon" width={60} height={60} />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ImageChange;

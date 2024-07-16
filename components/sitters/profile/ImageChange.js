import Image from "next/image";
import { useFormikContext } from "formik";
import { useState, useRef } from "react";
import userimage from "../../../public/assets/navbar/usermock.svg";
import plus from "../../../public/assets/icon-plus.svg";

const ImageChange = ({ profile }) => {
  const [preview, setPreview] = useState(profile.profile_image_url || null);
  const [error, setError] = useState(null);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef(null);

  console.log(profile);

  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
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
          priority
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
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ImageChange;

import Image, { getImageProps } from "next/image";
import iconUpLoad from "@/public/assets/sitters/icon-upload.svg";
import iconClose from "@/public/assets/sitters/icon-close.svg";
import { Formik, Form, Field, useFormikContext } from "formik";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { SittersProfileContext } from "@/pages/sitters/[id]/profile";
import { useContext } from "react";

export default function ImageGallery({
  gallery,
  setGallery,
  images,
  setImage,
  profile,
  uploadImage,
}) {
  const { storageImages, setstorageImages, removeStorageImage, CDNURL } =
    useContext(SittersProfileContext);
  const { setFieldValue } = useFormikContext();

  const handleGalleryChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + gallery.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }

    for (const file of files) {
      if (file.size <= 2 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGallery((prev) => [...prev, reader.result]);
          const newImage = images;
          newImage.push(file);
          setImage(newImage);
          // setFieldValue("sitters_images", images);
        };
        reader.readAsDataURL(file);
      } else {
        alert("File size should not exceed 2 MB.");
      }
    }
  };

  function handleRemoveImage(index) {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);

    const newImagesGallery = images.filter((_, i) => i !== index);
    setImage(newImagesGallery);

    // setFieldValue("sitters_images", newImagesGallery);
  }

  return (
    <div className="flex flex-wrap gap-4">
      {storageImages.map((image, index) => (
        <div key={index} className="relative w-[167px] h-[167px]">
          <img
            src={CDNURL + profile.id + "/" + image.name}
            alt={`Gallery image ${index}`}
            className="object-cover w-full h-full rounded-lg"
          />
          <div
            className="absolute w-[24px] h-[24px] top-0 right-0 translate-x-1 -translate-y-1 cursor-pointer rounded-full bg-ps-gray-400 flex items-center justify-center"
            onClick={() => removeStorageImage(image.name)}
          >
            <Image src={iconClose} alt="Remove Icon" width={8} height={8} />
          </div>
        </div>
      ))}
      {storageImages.length < 10 && (
        <div className="w-[167px] h-[167px] flex flex-col justify-center items-center bg-ps-orange-100 rounded-lg cursor-pointer">
          <input
            className="hidden"
            type="file"
            id="fileInput"
            onChange={(e) => uploadImage(e, profile.id)}
            accept="image/jpeg, image/png"
            multiple
          />
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center cursor-pointer"
          >
            <Image src={iconUpLoad} width={40} height={40} alt="Upload Icon" />
            <p className="text-ps-orange-500 font-bold text-[16px] p-3">
              Upload Image
            </p>
          </label>
        </div>
      )}
    </div>
  );
}

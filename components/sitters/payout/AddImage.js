import { Formik, Form, Field, useFormikContext } from "formik";


export default function AddImage({ setPreview }) {
    const { setFieldValue } = useFormikContext();
    const handleImageChange = async (event) => {
      const file = event.currentTarget.files[0];
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
      <input
        className="w-[60px] h-[60px] opacity-0 absolute bottom-0"
        type="file"
        name="book_bank_image"
        onChange={handleImageChange}
        accept="image/jpeg, image/png, image/jpg"
      />
    );
  }

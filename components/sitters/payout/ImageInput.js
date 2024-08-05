export default function ImageInput({ setFieldValue, setPreview }) {
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
  return (
    <input
      className="w-[60px] h-[60px] opacity-0 absolute bottom-0"
      type="file"
      id="book_bank_image"
      onChange={(event) => handleImageChange(event, setFieldValue)}
      accept="image/jpeg, image/png, image/jpg"
    />
  );
}

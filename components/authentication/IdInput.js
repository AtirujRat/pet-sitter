const IdInput = ({ field, form, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value);
    form.setFieldValue(field.name, formattedValue);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    let formattedValue = "";

    if (cleaned.length > 0) {
      formattedValue += cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formattedValue += "" + cleaned.substring(3, 6);
    }
    if (cleaned.length > 6) {
      formattedValue += "" + cleaned.substring(6, 13);
    }

    return formattedValue;
  };

  return (
    <input {...field} {...props} value={field.value} onChange={handleChange} />
  );
};

export default IdInput;

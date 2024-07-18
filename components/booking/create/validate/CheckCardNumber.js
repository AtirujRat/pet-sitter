const CheckCardNumber = ({ field, form, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatCardNumber(value);
    form.setFieldValue(field.name, formattedValue);
  };

  const formatCardNumber = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    let formattedValue = "";

    if (cleaned.length > 0) {
      formattedValue += cleaned.substring(0, 4);
    }
    if (cleaned.length > 4) {
      formattedValue += " " + cleaned.substring(4, 8);
    }
    if (cleaned.length > 8) {
      formattedValue += " " + cleaned.substring(8, 12);
    }
    if (cleaned.length > 12) {
      formattedValue += " " + cleaned.substring(12, 16);
    }

    return formattedValue;
  };

  return (
    <input {...field} {...props} value={field.value} onChange={handleChange} />
  );
};

export default CheckCardNumber;

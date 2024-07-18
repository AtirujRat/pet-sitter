const CheckCvc = ({ field, form, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatCvc(value);
    form.setFieldValue(field.name, formattedValue);
  };

  const formatCvc = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    let formattedValue = "";

    if (cleaned.length > 0) {
      formattedValue += cleaned.substring(0, 3);
    }

    return formattedValue;
  };

  return (
    <input {...field} {...props} value={field.value} onChange={handleChange} />
  );
};

export default CheckCvc;

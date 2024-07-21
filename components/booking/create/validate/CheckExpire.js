export default function CheckExpire({ field, form, ...props }) {
  function handleChange(event) {
    const { value } = event.target;
    const formattedValue = formatExpire(value);
    form.setFieldValue(field.name, formattedValue);
  }

  function formatExpire(value) {
    const cleaned = ("" + value).replace(/\D/g, "");
    let formattedValue = "";

    if (cleaned.length > 0) {
      formattedValue += cleaned.substring(0, 2);
    }
    if (cleaned.length > 2) {
      formattedValue += "/" + cleaned.substring(2, 4);
    }

    return formattedValue;
  }

  return (
    <input {...field} {...props} value={field.value} onChange={handleChange} />
  );
}

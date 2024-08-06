export default function GetOnlyDate({ time }) {
  let date = new Date(time);
  let day = String(date.getDate()).padStart(2, "0");
  let month = date.toLocaleString("en-US", { month: "long" }); // Months are zero-based
  let year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

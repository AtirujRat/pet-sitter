export default function GetOnlyTime({ time }) {
  let date = new Date(time);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  hours = String(hours).padStart(2, "0");

  return `${hours}:${minutes} ${ampm}`;
}

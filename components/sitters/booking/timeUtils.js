// Function to format date with year
export const formatDateWithYear = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatDateWithoutYear = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const hours = date.getHours() % 12 || 12; // convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${day} ${month}, ${hours}:${minutes} ${ampm}`;
};

export const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const hours = date.getHours() % 12 || 12; // convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
};

export const calculateDurationInHours = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const differenceInMilliseconds = end - start;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours.toFixed(2); // Format to 2 decimal places
};

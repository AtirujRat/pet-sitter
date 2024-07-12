export function PetTag({ type }) {
  let styles = {};
  let text = "";

  if (type.toLowerCase() === "dog") {
    styles = {
      textColor: "text-ps-green-500",
      borderColor: "border-ps-green-500",
      bgColor: "bg-ps-green-100",
    };
    text = "Dog";
  } else if (type.toLowerCase() === "cat") {
    styles = {
      textColor: "text-ps-pink-500",
      borderColor: "border-ps-pink-500",
      bgColor: "bg-ps-pink-100",
    };
    text = "Cat";
  } else if (type.toLowerCase() === "bird") {
    styles = {
      textColor: "text-ps-blue-500",
      borderColor: "border-ps-blue-500",
      bgColor: "bg-ps-blue-100",
    };
    text = "Bird";
  } else if (type.toLowerCase() === "rabbit") {
    styles = {
      textColor: "text-ps-orange-400",
      borderColor: "border-ps-orange-400",
      bgColor: "bg-ps-yellow-100",
    };
    text = "Rabbit";
  } else {
    styles = {
      textColor: "text-gray-500",
      borderColor: "border-gray-500",
      bgColor: "bg-gray-100",
    };
    text = "Unknown";
  }

  return (
    <span
      className={`${styles.textColor} text-base h-8 py-1 px-4 border-[1px] ${styles.borderColor} ${styles.bgColor} rounded-[99px] w-fit`}
    >
      {text}
    </span>
  );
}

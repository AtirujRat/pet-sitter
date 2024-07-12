export function PetTag({ type }) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 3403445 (feat: create api get pet)
  let styles = {
    textColor: "text-gray-500",
    borderColor: "border-gray-500",
    bgColor: "bg-gray-100",
  };
  let text = "Unknown";
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
  const lowerCaseType = type ? type.toLowerCase() : null;

  if (lowerCaseType === "dog") {
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
  let styles = {};
  let text = "";

  if (type.toLowerCase() === "dog") {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======

  const lowerCaseType = type ? type.toLowerCase() : null;

  if (lowerCaseType === "dog") {
>>>>>>> b87b3ee (feat: create api get pet)
=======
  if (type === "dog") {
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======

  const lowerCaseType = type ? type.toLowerCase() : null;

  if (lowerCaseType === "dog") {
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
    styles = {
      textColor: "text-ps-green-500",
      borderColor: "border-ps-green-500",
      bgColor: "bg-ps-green-100",
    };
    text = "Dog";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  } else if (lowerCaseType === "cat") {
=======
  } else if (type.toLowerCase() === "cat") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  } else if (lowerCaseType === "cat") {
>>>>>>> b87b3ee (feat: create api get pet)
=======
  } else if (type === "cat") {
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
  } else if (type.toLowerCase() === "cat") {
>>>>>>> 0333687 (feat: edit update pet form)
=======
  } else if (lowerCaseType === "cat") {
>>>>>>> 3403445 (feat: create api get pet)
=======
  } else if (type.toLowerCase() === "cat") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
    styles = {
      textColor: "text-ps-pink-500",
      borderColor: "border-ps-pink-500",
      bgColor: "bg-ps-pink-100",
    };
    text = "Cat";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  } else if (lowerCaseType === "bird") {
=======
  } else if (type.toLowerCase() === "bird") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  } else if (lowerCaseType === "bird") {
>>>>>>> b87b3ee (feat: create api get pet)
=======
  } else if (type === "bird") {
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
  } else if (type.toLowerCase() === "bird") {
>>>>>>> 0333687 (feat: edit update pet form)
=======
  } else if (lowerCaseType === "bird") {
>>>>>>> 3403445 (feat: create api get pet)
=======
  } else if (type.toLowerCase() === "bird") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
    styles = {
      textColor: "text-ps-blue-500",
      borderColor: "border-ps-blue-500",
      bgColor: "bg-ps-blue-100",
    };
    text = "Bird";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  } else if (lowerCaseType === "rabbit") {
=======
  } else if (type.toLowerCase() === "rabbit") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
  } else if (lowerCaseType === "rabbit") {
>>>>>>> b87b3ee (feat: create api get pet)
=======
  } else if (type === "rabbit") {
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
  } else if (type.toLowerCase() === "rabbit") {
>>>>>>> 0333687 (feat: edit update pet form)
=======
  } else if (lowerCaseType === "rabbit") {
>>>>>>> 3403445 (feat: create api get pet)
=======
  } else if (type.toLowerCase() === "rabbit") {
>>>>>>> 5c2ccd2 (feat: edit update pet form)
    styles = {
      textColor: "text-ps-orange-400",
      borderColor: "border-ps-orange-400",
      bgColor: "bg-ps-yellow-100",
    };
    text = "Rabbit";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
  } else {
    styles = {
      textColor: "text-gray-500",
      borderColor: "border-gray-500",
      bgColor: "bg-gray-100",
    };
    text = "Unknown";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5c2ccd2 (feat: edit update pet form)
=======
>>>>>>> b87b3ee (feat: create api get pet)
=======
>>>>>>> 0333687 (feat: edit update pet form)
=======
>>>>>>> 3403445 (feat: create api get pet)
=======
>>>>>>> 5c2ccd2 (feat: edit update pet form)
  }

  return (
    <span
      className={`${styles.textColor} text-base h-8 py-1 px-4 border-[1px] ${styles.borderColor} ${styles.bgColor} rounded-[99px] w-fit`}
    >
      {text}
    </span>
  );
}

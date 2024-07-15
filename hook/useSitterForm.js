import axios from "axios";
import { useRouter } from "next/router";

export const useSitterForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const initialValues = {
    email: "",
    phone_number: "",
    profile_image_url: "",
    full_name: "",
    experience: "",
    introduction: "",
    trade_name: "",
    place_description: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.phone_number) {
      errors.phone_number = "Required";
    } else if (values.phone_number[0] != 0) {
      errors.phone_number = "The first digit must be 0.";
    } else if (values.phone_number.length != 10) {
      errors.phone_number = "Phone number must contain 10 digits.";
    }

    if (!values.profile_image_url) {
      errors.profile_image_url = "Required";
    } else if (
      !/^(https?:\/\/.*\.(?:png|jpg))$/i.test(values.profile_image_url)
    ) {
      errors.profile_image_url = "Invalid URL format";
    }

    if (!values.full_name) {
      errors.full_name = "Required";
    } else if (values.full_name.length < 6 || values.full_name.length > 20) {
      errors.full_name = "Name characters must be between 6-20";
    }

    if (!values.experience) {
      errors.experience = "Required";
    }

    if (!values.introduction) {
      errors.introduction = "Required";
    }

    if (!values.trade_name) {
      errors.tradename = "Required";
    }

    if (!values.place_description) {
      errors.place_description = "Required";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    const id = 1; // ตัวอย่าง ID
    const response = await fetch(`/api/sitters/${id}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Profile updated:", data);
    } else {
      const errorData = await response.json();
      console.error("Error updating profile:", errorData);
    }
  };

  return {
    initialValues,
    validate,
    onSubmit,
  };
};

<<<<<<< HEAD
import axios from "axios";
import { useRouter } from "next/router";

export const useSitterForm = () => {
  const router = useRouter();
  const { id } = router.query;

=======
export const useSitterForm = () => {
>>>>>>> 40adff159b944931ebb64a234f0d39c73b156b86
  const initialValues = {
    email: "",
    password: "",
    phone_number: "",
    profile_image_url: "",
    full_name: "",
    experience: "",
    introduction: "",
    bank_id: "",
    account_number: "",
<<<<<<< HEAD
    trade_name: "",
    place_description: "",
    member_status: "",
    sitter_address_id: "",
=======
    trad_ename: "",
    place_description: "",
>>>>>>> 40adff159b944931ebb64a234f0d39c73b156b86
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.phone_number) {
      errors.phone_number = "Required";
    }

    if (!values.profile_image_url) {
<<<<<<< HEAD
      errors.profile_image_url = "Required";
    } else if (
      !/^(https?:\/\/.*\.(?:png|jpg))$/i.test(values.profile_image_url)
    ) {
      errors.profile_image_url = "Invalid URL format";
    }

    if (!values.full_name) {
      errors.full_name = "Required";
=======
      errors.profile_image = "Required";
    } else if (!/^(https?:\/\/.*\.(?:png|jpg))$/i.test(values.profile_image)) {
      errors.profile_image = "Invalid URL format";
    }

    if (!values.full_name) {
      errors.fullname = "Required";
>>>>>>> 40adff159b944931ebb64a234f0d39c73b156b86
    }

    if (!values.experience) {
      errors.experience = "Required";
    }

    if (!values.introduction) {
      errors.introduction = "Required";
    }

    if (!values.bank_id) {
      errors.bank_id = "Required";
    }

    if (!values.account_number) {
      errors.account_number = "Required";
    }

    if (!values.trade_name) {
      errors.trade_name = "Required";
    }

    if (!values.place_description) {
      errors.place_description = "Required";
    }

    if (!values.member_status) {
      errors.member_status = "Required";
    }

    if (!values.sitter_address_id) {
      errors.sitter_address_id = "Required";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.put(`/api/sitters/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Profile updated:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error updating profile:", error.response.data);
      } else {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  return {
    initialValues,
    validate,
    onSubmit,
  };
};

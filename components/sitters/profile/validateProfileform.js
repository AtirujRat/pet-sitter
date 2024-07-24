export function validateName(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6 || value.length > 20) {
    error = "Name characters must be between 6-20";
  }
  return error;
}

export function validateRequired(value) {
  let error;
  if (!value || value === "") {
    error = "Required";
  }
  return error;
}

export function validatePhone(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value[0] != 0) {
    error = "The first digit must be 0.";
  } else if (value.length != 12) {
    error = "Phone number must contain 10 digits.";
  }
  return error;
}

export async function validateEmail(value) {
  let error;
  let { data: owner_email } = await supabase
    .from("owners")
    .select("*")
    .eq("email", value);

  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  } else if (owner_email[0]) {
    error = "This email already exist";
  }

  return error;
}

export function validateRequiredAddress(value) {
  console.log("wi", value);
  let error = {};
  if (!value?.address_detail?.length > 0) {
    error.address_detail = "Required";
  }

  if (!value?.province?.length > 0) {
    error.province = "Required";
  }

  if (!value?.district?.length > 0) {
    error.district = "Required";
  }

  if (!value?.subDistrict?.length > 0) {
    error.subDistrict = "Required";
  }

  if (!value?.zip_code > 0) {
    error.zip_code = "Required";
  }

  return error;
}

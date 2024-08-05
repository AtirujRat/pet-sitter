export function validateCvc(value) {
  let error;
  if (!value || value.length < 3) {
    error = "Required";
  }
  return error;
}

export function validateCardNumber(value) {
  let error;
  if (!value || value.length < 19) {
    error = "Required";
  }
  return error;
}

export function validateName(value) {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
}
export function validateExpire(value) {
  let error;
  if (!value || value.length < 5) {
    error = "Required";
  }
  if (value.slice(0, 2) > 12) {
    error = "error";
  }
  return error;
}

export function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
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

import { useState, useEffect } from "react";

export default function AlertTop({ text, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideComponentTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(hideComponentTimeout);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="toast toast-top toast-center">
      {type === "error" && (
        <div
          role="alert"
          className="alert alert-error text-b2 flex items-center z-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="max-sm:min-w-[275px] max-sm:text-wrap text-start">
            {text}
          </span>
        </div>
      )}
      {type === "success" && (
        <div
          role="alert"
          className="alert alert-success text-b2 flex items-center z-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="max-sm:min-w-[275px] max-sm:text-wrap text-start">
            {text}
          </span>
        </div>
      )}
      {type === "warning" && (
        <div
          role="alert"
          className="alert alert-warning text-b2 flex items-center z-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="max-sm:min-w-[275px] max-sm:text-wrap text-start">
            {text}
          </span>
        </div>
      )}
      {type === "info" && (
        <div
          role="alert"
          className="alert alert-info text-b2 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="max-sm:min-w-[275px] max-sm:text-wrap text-start">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

//example

//const [error, setError] = useState(null);
//const [success, setSuccess] = useState(null);
// const [alertKey, setAlertKey] = useState(0);

// setError("File size should not exceed 2 MB.");
// setAlertKey((prevKey) => prevKey + 1);
// setError(null);

// setSuccess("Create pet successful.");
// setAlertKey((prevKey) => prevKey + 1);
// setSuccess(null);

// {error && <AlertTop key={alertKey} type="error" text={error} />}
// {success && <AlertTop key={alertKey} type="success" text={success} />}

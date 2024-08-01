import React from "react";

export default function Modal({ children, closeModal }) {
  return (
    <div className="fixed flex justify-center items-center w-full h-full z-50 top-0 left-0">
      <div className="absolute bg-ps-black opacity-60 max-lg:opacity-70 w-full h-full"></div>
      <div className="max-lg:w-full z-10 max-lg:flex max-lg:justify-center">
        {children}
      </div>
    </div>
  );
}

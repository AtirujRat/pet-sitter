import React from "react";

export default function Modal({ children, closeModal }) {
  return (
    <div className="fixed flex justify-center items-center w-full h-full z-50 top-0">
      <div className="absolute lg:bg-[rgba(75,75,75)] bg-ps-black max-lg:opacity-70 w-full h-full"></div>
      <div className="max-lg:w-full z-10 max-lg:flex max-lg:justify-center">
        {children}
      </div>
    </div>
  );
}

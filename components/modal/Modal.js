import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="absolute flex justify-center items-center w-full h-full z-50 top-0">
      <div className="absolute bg-ps-black opacity-70 w-full h-full"></div>
      <div className="z-10">{children}</div>
    </div>
  );
};

export default Modal;

import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="fixed flex justify-center items-center w-full h-fill z-50 top-0 left-0">
      <div className="absolute bg-ps-black opacity-70 w-full h-full"></div>
      <div className="z-10">{children}</div>
    </div>
  );
};

export default Modal;

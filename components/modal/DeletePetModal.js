import Image from "next/image";
import { ButtonOrange, ButtonOrangeLight } from "../buttons/OrangeButtons";

const DeleteConfirmationModal = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Modal Backdrop */}
      <div className="absolute top-0 left-0 w-full h-full bg-ps-black opacity-70"></div>

      {/* Modal Box */}
      <div className="relative w-[400px] h-[208px] bg-ps-white rounded-2xl z-40 flex flex-col justify-around py-2">
        <div className="flex justify-between w-full border-b-[1.5px] border-b-ps-gray-200 pb-4 item items-center px-6">
          <h4 className="text-h4">Delete Confirmation</h4>
          <Image
            src="/assets/icons/icon-x.svg"
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={onCancel}
          />
        </div>
        <p className="text-ps-gray-400 px-6">
          Are you sure you want to delete this pet?
        </p>
        <div className="flex justify-between px-6">
          <ButtonOrangeLight text="Cancel" onClick={onCancel} />
          <button onClick={onDelete}>
            <ButtonOrange text="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

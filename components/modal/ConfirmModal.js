import Image from "next/image";
import { ButtonOrange, ButtonOrangeLight } from "../buttons/OrangeButtons";

export function ConfirmModal({
  isOpen,
  onCancel,
  onClick,
  title,
  description,
  buttonOrangeLightText,
  buttonOrangeText,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Modal Backdrop */}
      <div className="absolute top-0 left-0 w-full h-full bg-ps-black opacity-70"></div>

      {/* Modal Box */}
      <div className="relative max-sm:w-[343px] max-md:w-[55%] w-[400px] h-[208px] bg-ps-white rounded-2xl z-40 flex flex-col justify-around py-2">
        <div className="flex justify-between w-full border-b-[1px] border-b-ps-gray-200 pb-4 items-center px-6">
          <h4 className="text-h4">{title}</h4>
          <Image
            src="/assets/icons/icon-x.svg"
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={onCancel}
            alt="Close icon"
          />
        </div>
        <p className="text-ps-gray-400 px-6">{description}</p>
        <div className="flex justify-between px-6">
          <ButtonOrangeLight
            text={buttonOrangeLightText}
            onClick={onCancel}
            width="w-fit"
          />
          <ButtonOrange
            text={buttonOrangeText}
            onClick={onClick}
            width="w-fit"
          />
        </div>
      </div>
    </div>
  );
}

ConfirmModal.defaultProps = {
  title: "title",
  description: "description",
  buttonOrangeLightText: "Cancel",
  buttonOrangeText: "buttonOrangeText",
};

// example

// const [modalOpen, setModalOpen] = useState(false);

// const toggleModal = (state) => {
//   setModalOpen(state);
// };

{
  /* <button
              className="button-open-modal"
              onClick={(event) => {
                event.preventDefault();
                toggleModal(true);
              }}
></button> */
}

// {modalOpen && (
//   <ConfirmModal
//     isOpen={modalOpen}
//     onCancel={() => toggleModal(false)}
//     onClick={handleDelete}
//     title="Delete Confirmation"
//     description="Are you sure to delete this pet?"
//     buttonOrangeText="Delete"
//   />
// )}

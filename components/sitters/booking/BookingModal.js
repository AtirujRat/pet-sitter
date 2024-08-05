export default function BookingModal({ children, openModal, setOpenModal }) {
  if (openModal)
    return (
      <div className="fixed flex justify-center items-center w-screen h-screen z-50 top-0 left-0">
        <div
          className="absolute w-full h-full top-0 left-0 bg-ps-black opacity-80  z-0"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="relative w-full h-full overflow-auto flex justify-center items-start sm:items-center">
          {children}
        </div>
      </div>
    );
  else return null;
}

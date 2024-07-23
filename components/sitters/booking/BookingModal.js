export default function BookingModal({ children, openModal, setOpenModal }) {
  if (openModal)
    return (
      <div className="fixed flex justify-center items-center w-screen h-screen z-50 top-0 left-0">
        <div
          className="absolute w-full h-full top-0 left-0 lg:bg-[rgba(75,75,75)] bg-ps-black  z-0"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="relative ">{children}</div>
      </div>
    );
  else return null;
}

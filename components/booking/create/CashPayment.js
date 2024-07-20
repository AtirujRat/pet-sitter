import { useBooking } from "@/context/Booking";
import paw from "@/public/assets/booking/create/paw.svg";
import Image from "next/image";
export default function CashPayment() {
  const { setStepBooking, setConfirm, addBookingHandle, booking } =
    useBooking();
  return (
    <section className="w-full h-full ">
      <div className="w-full lg:h-[50%] bg-ps-gray-100 flex flex-col justify-center items-center gap-6">
        <Image src={paw} alt={paw} />
        <p className="text-center">
          If you want to pay by cash,
          <br /> you are required to make a cash payment <br />
          upon arrival at the pet sitter's location.
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setStepBooking("information");
        }}
        className="btn hover:bg-ps-orange-200 max-lg:w-[45%] lg:px-12 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-[-595px] max-lg:left-4 lg:bottom-14"
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => {
<<<<<<< HEAD
          addBookingHandle({ ...booking, payment_method: "Cash" });
          setConfirm("confirm");
=======
          // addBookingHandle({ ...booking, paymet_method: "cash" });
          setConfirm(1);
>>>>>>> a24dc1d (feat: able to booking)
        }}
        className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-12 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4 lg:bottom-14 lg:right-10"
      >
        Confirm Booking
      </button>
    </section>
  );
}

import { useSearch } from "@/context/Search";
import paw from "@/public/assets/booking/create/paw.svg";
import Image from "next/image";
export default function CashPayment() {
  const { setStepBooking } = useSearch();
  return (
    <section className="max-lg:hidden w-full h-full ">
      <div className="w-full h-[50%] bg-ps-gray-100 flex flex-col justify-center items-center gap-6">
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
          setStepBooking(2);
        }}
        className="btn hover:bg-ps-orange-200 py-3 px-12 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-14"
      >
        Back
      </button>
      <button
        type="button"
        className="btn hover:bg-ps-orange-600 py-3 px-6 bg-ps-orange-500 text-ps-white rounded-[99px] absolute bottom-14 right-10"
      >
        Confirm Booking
      </button>
    </section>
  );
}

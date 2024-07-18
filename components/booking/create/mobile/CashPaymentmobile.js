import { useSearch } from "@/context/Search";
import paw from "@/public/assets/booking/create/paw.svg";
import Image from "next/image";
export default function CashPaymentmobile() {
  const { setStepBooking } = useSearch();
  return (
    <section className="lg:hidden w-full h-full">
      <div className="w-full bg-ps-gray-100 flex flex-col justify-center items-center gap-6">
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
        className="btn hover:bg-ps-orange-200 w-[45%] py-3 bg-ps-orange-100 text-b2 text-ps-orange-500 border-none rounded-[99px] absolute bottom-[-595px] left-4"
      >
        Back
      </button>
      <button
        type="button"
        className="btn hover:bg-ps-orange-600 w-[45%] py-3 bg-ps-orange-500 text-ps-white rounded-[99px] absolute bottom-[-595px] right-4"
      >
        Confirm Booking
      </button>
    </section>
  );
}

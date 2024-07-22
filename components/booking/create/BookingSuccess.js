import Image from "next/image";
import viewmap from "@/public/assets/booking/create/viewmap.svg";
import { useRouter } from "next/router";
import { useBooking } from "@/context/Booking";

export default function BookingSuccess() {
  const router = useRouter();
  const { addBookingHandle, handleBookingSuccess } = useBooking();
  return (
    <section className="w-full lg:w-[50%] h-full pt-10 flex flex-col justify-center items-center gap-10 z-10">
      <div className="w-full lg:w-[80%] lg:min-w-[600px] min-h-[550px] bg-ps-white border-none lg:rounded-2xl shadow-[4px_4px_24px_0_rgba(0,0,0,0.4)] flex flex-col">
        <div className="p-6 bg-ps-black border-none lg:rounded-t-2xl flex flex-col items-center">
          <h2 className="text-h2 text-ps-white">Thank You For Booking</h2>
          <p className="text-b2 text-ps-gray-300">
            We will send your booking information to Pet Sitter.
          </p>
        </div>

        <div className="w-full py-6 px-4 lg:p-10 flex flex-col gap-6">
          <div>
            <p className="text-b2 text-ps-gray-300">
              Transaction Date: Tue, 16 Oct 2022
            </p>
            <p className="text-b2 text-ps-gray-300">Transaction No. : 122312</p>
          </div>

          <div>
            <p className="text-b3 text-ps-gray-400">Pet Sitter:</p>
            <div className="flex justify-between items-center">
              <p className="text-b2 text-ps-gray-600">
                Happy House! By Jane Maison
              </p>
              <button type="button">
                <Image src={viewmap} alt={viewmap} />
              </button>
            </div>
          </div>

          <div className="w-full flex max-lg:flex-col justify-between gap-6">
            <div className="w-full">
              <p className="text-b3 text-ps-gray-400">Date & Time:</p>
              <p className="text-b2 text-ps-gray-600">
                25 Aug, 2023 <span className="text-ps-gray-400">|</span> 7 AM -
                10 AM
              </p>
            </div>
            <div className="w-full">
              <p className="text-b3 text-ps-gray-400">Duration:</p>
              <p className="text-b2 text-ps-gray-600">3 hours</p>
            </div>
          </div>

          <div>
            <p className="text-b3 text-ps-gray-400">Pet:</p>
            <p className="text-b2 text-ps-gray-600">Bubba, Daisy</p>
          </div>

          <div className="pt-4 flex justify-between border-t-2 border-t-ps-gray-200">
            <p className="text-b2 text-ps-black">Total</p>
            <p className="text-b2 text-ps-black">900.00 THB</p>
          </div>
        </div>
      </div>
      <div className="w-96 max-lg:pt-40 flex justify-between">
        <button
          type="button"
          onClick={() => {
            addBookingHandle({});
            localStorage.removeItem("myState");
            localStorage.removeItem("user");
            handleBookingSuccess();
          }}
          className="btn hover:bg-ps-orange-200 max-lg:w-[45%] lg:px-10 bg-ps-orange-100 text-ps-orange-500 text-b2 border-none rounded-[99px] "
        >
          Booking Detail
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/");
            localStorage.removeItem("myState");
            localStorage.removeItem("user");
            handleBookingSuccess();
          }}
          className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-6 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px]"
        >
          Back To Home
        </button>
      </div>
    </section>
  );
}

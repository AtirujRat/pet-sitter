import close from "@/public/assets/booking/create/close.svg";
import Image from "next/image";
import { useBooking } from "@/context/Booking";
import axios from "axios";
import { useUser } from "@/context/User";

export default function Confirm() {
  const { booking, setConfirm, handleBookingSuccess } = useBooking();
  const { setConnection, connection, userInfo } = useUser();

  async function handleOnclick() {
    try {
      await axios.post(`/api/owner/${userInfo.id}/createbooking`, booking);
      setTimeout(() => {
        setConfirm("booking detail");
        localStorage.removeItem("myState");
        localStorage.removeItem("user");
        handleBookingSuccess();
      }, 1500);
    } catch (error) {
      setConnection(!connection);
    }
  }

  return (
    <section className="w-[90%] lg:w-[400px] h-[210px] bg-ps-white rounded-2xl ">
      <div className="py-4 px-6 border-b-2 border-b-ps-gray-100 flex justify-between">
        <h4 className="text-b1 lg:text-h4">Booking Confirmation</h4>
        <button
          type="button"
          onClick={() => {
            setConfirm("booking");
          }}
        >
          <Image src={close} alt={close} />
        </button>
      </div>

      <div className="flex flex-col p-6 gap-6">
        <p className="text-b2 text-ps-gray-400">
          Are you sure to booking this pet sitter?
        </p>
        <div className="w-full flex justify-between">
          <button
            type="button"
            onClick={() => {
              setConfirm("booking");
            }}
            className="btn hover:bg-ps-orange-200 max-lg:w-[45%] lg:px-10 bg-ps-orange-100 text-ps-orange-500 text-b2 border-none rounded-[99px] "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOnclick}
            className="btn hover:bg-ps-orange-600 max-lg:w-[45%] lg:px-6 bg-ps-orange-500 text-b2 text-ps-white rounded-[99px]"
          >
            Yes, I’m sure
          </button>
        </div>
      </div>
    </section>
  );
}

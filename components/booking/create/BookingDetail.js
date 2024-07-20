import { useBooking } from "@/context/Booking";
import { useSitters } from "@/context/SittersProvider";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function BookingDetail() {
  const [duration, setDuration] = useState();
  const [total, setTotal] = useState(0);
  const { sitter } = useSitters();
  const { booking, addBookingHandle } = useBooking();

  function handleDuration() {
    setDuration((end - start) / 3600000);
    let price = (duration / 3) * 600;
    if (booking.owner_pet.length > 0) {
      price = (duration / 3) * 300 * (booking.owner_pet.length + 1);
    }
    setTotal(price);
    addBookingHandle({
      ...booking,
      duration: duration,
      price: total,
    });
  }

  let dateStart = new Date(booking.start_time);
  dateStart = String(dateStart);

  let start = new Date(booking.start_time);
  let end = new Date(booking.end_time);

  useEffect(() => {
    handleDuration();
  }, [booking.owner_pet.length, total]);

  if (!booking) {
    return <Loading />;
  }

  return (
    <section className="w-full lg:w-[30%] max-lg:pb-[100px] lg:h-fit flex flex-col border-none rounded-2xl shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)]">
      <h3 className="p-6 border-b-[1px] text-h3 text-ps-gray-600 border-ps-gray-200">
        Booking Detail
      </h3>
      <div className="p-6 flex flex-col gap-6">
        <div>
          <p className="text-b3 text-ps-gray-400">Pet sitter:</p>
          <p className="text-b2 text-ps-gray-600">
            {sitter.trade_name || null} By {sitter.full_name || null}
          </p>
        </div>

        <div>
          <p className="text-b3 text-ps-gray-400">Date & Time:</p>
          <p className="text-b2 text-ps-gray-600">
            {dateStart.slice(8, 10) || null} {dateStart.slice(4, 7) || null},{" "}
            {dateStart.slice(11, 15) || null}{" "}
            <span className="text-ps-gray-400">|</span>{" "}
            {booking.start_time.slice(10).trim() || null} -{" "}
            {booking.end_time.slice(10).trim() || null}
          </p>
        </div>

        <div>
          <p className="text-b3 text-ps-gray-400">Duration:</p>
          <p className="text-b2 text-ps-gray-600">{duration || null} hours</p>
        </div>

        <div>
          <p className="text-b3 text-ps-gray-400">Pet:</p>
          <p className="text-b2 text-ps-gray-600">
            {booking.owner_pet[0] ? booking.owner_pet.join(", ") : "-"}
          </p>
        </div>
      </div>
      <div className="p-6 bg-ps-black border-none rounded-b-2xl flex justify-between">
        <p className="text-b2 text-ps-white">Total</p>
        <p className="text-b1 text-ps-white">{total ? total : 0}.00 THB</p>
      </div>
    </section>
  );
}

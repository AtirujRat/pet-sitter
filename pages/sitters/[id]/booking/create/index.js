import Backgroud from "@/components/booking/create/Background";
import BookingDetail from "@/components/booking/create/BookingDetail";
import Step from "@/components/booking/create/Step";
import YourPet from "@/components/booking/create/YourPet";
import Information from "@/components/booking/create/Information";
import Payment from "@/components/booking/create/Payment";
import { useBooking } from "@/context/Booking";
import Modal from "@/components/modal/Modal";
import Confirm from "@/components/booking/create/Confirm";
import BookingSuccess from "@/components/booking/create/BookingSuccess";

export default function BookingCreate() {
  const { stepBooking, confirm } = useBooking();
  return (
    <>
      <Backgroud />
      <div className="w-full lg:h-screen absolute top-0 lg:p-20 pt-20 lg:pt-32 flex justify-center gap-9 z-10">
        {confirm === 2 ? (
          <BookingSuccess />
        ) : (
          <>
            <section className="w-full lg:w-[65%] h-[95%] flex max-lg:flex-col justify-center gap-9">
              <div className="w-full lg:w-[70%] h-full">
                <Step />
                {stepBooking == "your_pet" ? (
                  <>
                    <YourPet />
                  </>
                ) : null}
                {stepBooking == "information" ? (
                  <>
                    <Information />
                  </>
                ) : null}
                {stepBooking == "payment" ? <Payment /> : null}
              </div>
              <BookingDetail />
            </section>
            {confirm === 1 ? (
              <Modal>
                <Confirm />
              </Modal>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

import Backgroud from "@/components/booking/create/Background";
import BookingDetail from "@/components/booking/create/desktop/BookingDetail";
import Step from "@/components/booking/create/desktop/Step";
import YourPet from "@/components/booking/create/desktop/YourPet";
import Information from "@/components/booking/create/desktop/Information";
import Payment from "@/components/booking/create/Payment";
import { useContext } from "react";
import { BookingContext } from "@/context/Booking";
import StepMobile from "@/components/booking/create/mobile/StepMobile";
import YourPetMobile from "@/components/booking/create/mobile/YourPetMobile";
import BookingDetailMobile from "@/components/booking/create/mobile/BookingDetailMobile";
import InformationMobile from "@/components/booking/create/mobile/InformationMobile";
import Modal from "@/components/modal/Modal";
import Confirm from "@/components/booking/create/Confirm";
import BookingSuccess from "@/components/booking/create/desktop/BookingSuccess";

export default function BookingCreate() {
  const { stepBooking, confirm } = useContext(BookingContext);
  return (
    <>
      <Backgroud />
      <section className="w-full lg:h-screen absolute top-0 lg:p-20 pt-20 lg:pt-32 flex justify-center gap-9 z-10">
        {confirm === 2 ? (
          <BookingSuccess />
        ) : (
          <>
            <div className="w-full lg:w-[65%] h-[95%] flex max-lg:flex-col justify-center gap-9">
              <div className="w-full lg:w-[70%] h-full">
                <Step />
                <StepMobile />
                {stepBooking == 1 ? (
                  <>
                    <YourPet />
                    {/* <YourPetMobile /> */}
                  </>
                ) : null}
                {stepBooking == 2 ? (
                  <>
                    <Information />
                    <InformationMobile />
                  </>
                ) : null}
                {stepBooking == 3 ? <Payment /> : null}
              </div>
              <BookingDetail />
              <BookingDetailMobile />
            </div>
            {confirm === 1 ? (
              <Modal>
                <Confirm />
              </Modal>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}

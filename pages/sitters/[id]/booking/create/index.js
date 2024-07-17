import Backgroud from "@/components/booking/create/desktop/Background";
import BookingDetail from "@/components/booking/create/desktop/BookingDetail";
import Step from "@/components/booking/create/desktop/Step";
import YourPet from "@/components/booking/create/desktop/YourPet";
import Information from "@/components/booking/create/desktop/Information";
import Payment from "@/components/booking/create/desktop/Payment";
import { useSearch } from "@/context/Search";
import StepMobile from "@/components/booking/create/mobile/StepMobile";

export default function BookingCreate() {
  const { stepBooking } = useSearch();
  return (
    <>
      <Backgroud />
      <section className="w-full h-screen absolute top-0 lg:p-20 pt-20 lg:pt-32 flex justify-center gap-9 z-1">
        <div className="w-full lg:w-[65%]  h-[95%] flex justify-center gap-9">
          <div className="w-full lg:w-[70%] h-full">
            <Step />
            <StepMobile />
            {/* {stepBooking == 1 ? <YourPet /> : null}
            {stepBooking == 2 ? <Information /> : null}
            {stepBooking == 3 ? <Payment /> : null} */}
          </div>
          {/* <BookingDetail /> */}
        </div>
      </section>
    </>
  );
}

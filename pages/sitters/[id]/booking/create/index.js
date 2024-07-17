import Backgroud from "@/components/booking/create/Background";
import BookingDetail from "@/components/booking/create/BookingDetail";
import Step from "@/components/booking/create/Step";
import YourPet from "@/components/booking/create/YourPet";
import Information from "@/components/booking/create/Information";

export default function BookingCreate() {
  return (
    <>
      <Backgroud />
      <section className="w-full h-screen absolute top-0 p-20 pt-32 flex justify-center gap-9 z-1">
        <div className="w-[65%] h-[95%] flex justify-center gap-9">
          <div className="w-[70%] h-full">
            <Step />
            {/* <YourPet /> */}
            <Information />
          </div>
          <BookingDetail />
        </div>
      </section>
    </>
  );
}

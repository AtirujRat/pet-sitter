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
import { useUser } from "@/context/User";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function BookingCreate() {
  const { stepBooking, confirm } = useBooking();
  const router = useRouter();
  const { userInfo } = useUser();

  return (
    <>
      {userInfo === "owner" ? (
        <>
          <Backgroud />
          <div className="w-full lg:h-screen absolute top-0 lg:p-20 pt-20 lg:pt-32 flex justify-center gap-9 z-1">
            {confirm === "booking detail" ? (
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
                {confirm === "confirm" ? (
                  <Modal>
                    <Confirm />
                  </Modal>
                ) : null}
              </>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

import { useBooking } from "@/context/Booking";
import star from "@/public/assets/booking/create/star.svg";
import successup from "@/public/assets/booking/create/successup.svg";
import successdown from "@/public/assets/booking/create/successdown.svg";
import Image from "next/image";
import { useEffect } from "react";

export default function Backgroud() {
  const { confirm } = useBooking();
  return (
    <div>
      {confirm === 2 ? (
        <>
          <Image
            src={successup}
            alt={successup}
            className="max-lg:w-[60%] max-lg:absolute max-lg:left-[-15px] max-lg:bottom-[-150px] z-1"
          />
          <Image
            src={successdown}
            alt={successdown}
            className="max-lg:hidden absolute bottom-0 right-0"
          />
        </>
      ) : (
        <div className="max-lg:hidden  absolute bottom-0 right-0">
          <Image src={star} alt={star} />
        </div>
      )}
    </div>
  );
}

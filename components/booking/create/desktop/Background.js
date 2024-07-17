import star from "@/public/assets/booking/create/star.svg";
import Image from "next/image";

export default function Backgroud() {
  return (
    <div className="absolute bottom-0 right-0">
      <Image src={star} alt="star" />
    </div>
  );
}

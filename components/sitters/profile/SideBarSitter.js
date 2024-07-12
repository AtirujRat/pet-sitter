import Image from "next/image";
import Link from "next/link";
import sitterlogo from "../../../public/assets/sister-logo.svg";
import profile from "../../../public/assets/sidebarsitter/profile-sidebar.svg";
import booking from "../../../public/assets/sidebarsitter/booking.svg";
import calendar from "../../../public/assets/sidebarsitter/calendar.svg";
import payout from "../../../public/assets/sidebarsitter/payout.svg";

const SideBarSitter = () => {
  return (
    <div className="pt-4 w-full max-w-[240px] h-screen bg-ps-white border-r border-[#E5E7F2]">
      <div className="pl-6 pt-6 pb-10 bg-ps-white">
        <Link href={"/"}>
          <Image src={sitterlogo} alt="sister-logo" width={131} />
        </Link>
      </div>
      <div className="bg-ps-white h-full">
        <button className="flex py-4 px-6 w-full gap-4 text-[#5B5D6F] text-[16px] font-medium hover:bg-ps-orange-100 hover:text-ps-orange-500">
          <Image
            src={profile}
            alt="sister-logo"
            width={22}
            height={22}
            className=""
          />
          Pet Sitter Profile
        </button>
        <button className="flex py-4 px-6 w-full gap-4 text-[#5B5D6F] text-[16px] font-medium hover:bg-ps-orange-100 hover:text-ps-orange-500">
          <Image src={booking} alt="sister-logo" width={24} height={24} />
          Booking List
        </button>
        <button className="flex py-4 px-6 w-full gap-4 text-[#5B5D6F] text-[16px] font-medium hover:bg-ps-orange-100 hover:text-ps-orange-500">
          <Image src={calendar} alt="sister-logo" width={24} height={24} />
          Calendar
        </button>
        <button className="flex py-4 px-6 w-full gap-4 text-[#5B5D6F] text-[16px] font-medium hover:bg-ps-orange-100 hover:text-ps-orange-500">
          <Image src={payout} alt="sister-logo" width={24} height={24} />
          Payout Option
        </button>
      </div>
    </div>
  );
};

export default SideBarSitter;

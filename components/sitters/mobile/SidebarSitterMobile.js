import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

import profile from "@/public/assets/sidebarsitter/profile-sidebar.svg";
import booking from "@/public/assets/sidebarsitter/booking.svg";
import calendar from "@/public/assets/sidebarsitter/calendar.svg";
import payout from "@/public/assets/sidebarsitter/payout.svg";
import profileActive from "@/public/assets/sidebarsitter/profile-sidebar-active.svg";
import bookingActive from "@/public/assets/sidebarsitter/booking-active.svg";
import calendarActive from "@/public/assets/sidebarsitter/calendar-active.svg";
import payoutActive from "@/public/assets/sidebarsitter/payout-active.svg";

export default function SidebarSitterMobile() {
  const router = useRouter();
  const { id } = router.query;
  const location = usePathname();
  const pathName = "/" + location.split("/")?.[3];

  const menu = [
    {
      icon: profile,
      iconActive: profileActive,
      label: "Pet Sitter Profile",
      pathUrl: "/profile",
    },
    {
      icon: booking,
      iconActive: bookingActive,
      label: "Booking List",
      pathUrl: "/booking",
    },
    // {
    //   icon: calendar,
    //   iconActive: calendarActive,
    //   label: "Calendar",
    //   pathUrl: "/calendar",
    // },
    {
      icon: payout,
      iconActive: payoutActive,
      label: "Payout Option",
      pathUrl: "/payout",
    },
  ];

  return (
    <div className=" w-full bg-[#FAFAFB] border-r border-[#E5E7F2] lg:hidden shadow-2xl">
      <div className="bg-[#FAFAFB] flex justify-between w-full lg:px-10 no-scrollbar overflow-auto">
        {menu.map((list, index) => (
          <Link
            href={`/sitters/${id}${list.pathUrl}`}
            key={list.label}
            className=" shrink-0 "
          >
            <button
              className={`flex gap-4 py-4 px-6 text-[16px] font-medium text-nowrap  shrink-0 ${
                list.pathUrl === pathName
                  ? "text-ps-orange-500 bg-ps-orange-100"
                  : "text-[#5B5D6F]"
              }`}
              key={list.label}
            >
              <Image
                src={list.pathUrl === pathName ? list.iconActive : list.icon}
                alt="sister-logo"
                width={22}
                height={22}
              />
              {list.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

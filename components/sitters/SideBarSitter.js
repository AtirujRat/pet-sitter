import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

import sitterlogo from "@/public/assets/sister-logo.svg";
import profile from "@/public/assets/sidebarsitter/profile-sidebar.svg";
import booking from "@/public/assets/sidebarsitter/booking.svg";
import calendar from "@/public/assets/sidebarsitter/calendar.svg";
import payout from "@/public/assets/sidebarsitter/payout.svg";
import profileActive from "@/public/assets/sidebarsitter/profile-sidebar-active.svg";
import bookingActive from "@/public/assets/sidebarsitter/booking-active.svg";
import calendarActive from "@/public/assets/sidebarsitter/calendar-active.svg";
import payoutActive from "@/public/assets/sidebarsitter/payout-active.svg";
import logOut from "@/public/assets/icons/icon-logout-gray.svg";

export default function SideBarSitter() {
  const router = useRouter();
  const { id } = router.query;
  const pathName = "/" + router.pathname?.split("/")?.[3];

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

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) return;
    router.push("/login/sitter");
  };

  return (
    <div className="pt-4 w-full max-w-[240px] h-screen bg-[#FAFAFB] border-r border-[#E5E7F2] sticky top-0 shrink-0 lg:flex lg:flex-col hidden">
      <div className="pl-6 pt-6 pb-10 bg-[#FAFAFB]">
        <Link href={"/"}>
          <Image src={sitterlogo} alt="sister-logo" width={131} />
        </Link>
      </div>
      <div className="bg-[#FAFAFB] grow flex flex-col justify-between">
        <div>
          {menu.map((list, index) => (
            <Link href={`/sitters/${id}${list.pathUrl}`} key={list.label}>
              <button
                className={`flex py-4 px-6 w-full gap-4  text-[16px] font-medium ${
                  list.pathUrl === pathName
                    ? "text-ps-orange-500 bg-ps-orange-100"
                    : "text-[#5B5D6F]"
                }`}
                key={list.label}
              >
                <Image
                  src={list.pathUrl === pathName ? list.iconActive : list.icon}
                  alt="sister-logo"
                  width={24}
                  height={24}
                />
                {list.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <button
        className="flex py-4 px-6 w-full gap-4  text-[16px] font-medium text-[#5B5D6F] border-t border-[#E5E7F2] border-r"
        onClick={handleLogout}
      >
        <Image src={logOut} alt="sister-logOut" width={24} height={24} />
        Log Out
      </button>
    </div>
  );
}

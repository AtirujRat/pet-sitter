import { useUser } from "@/context/User";
import { useSitterManageProfileState } from "@/context/SitterManageProfile";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import Loading from "@/components/Loading";
import SitterPayout from "@/components/sitters/payout/SitterPayout";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";

export default function SitterManageBookingList() {
  const { profile } = useSitterManageProfileState();
  const { userInfo } = useUser();
  const id = userInfo?.id;

  return (
    <div className="flex">
      <SideBarSitter />
      <div className="w-full flex-col">
        <NavBarSitter
          profileImage={profile?.profile_image_url}
          fullName={profile?.full_name}
        />
        {!profile ? (
          <Loading />
        ) : (
          <>
            <div className="w-full">
              <SidebarSitterMobile />
            </div>
            <div className="bg-ps-gray-100 flex flex-col gap-6 p-4 md:p-10 sm:px-10 sm:py-6 min-h-screen">
              <SitterPayout id={id} profile={profile} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useSitterManageProfileState } from "@/context/SitterManageProfile";

import NavBarSitter from "@/components/sitters/NavbarSitter";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import Loading from "@/components/Loading";
import BookingListDetail from "@/components/sitters/booking/BookingListDetail";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";

export default function Detail() {
  const router = useRouter();
  const { profile } = useSitterManageProfileState();
  const { bookingId } = router.query;

  if (!profile) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <SideBarSitter />
      <div className="w-full flex-col">
        <NavBarSitter
          profileImage={profile?.profile_image_url}
          fullName={profile?.full_name}
        />
        <div className="w-full">
          <SidebarSitterMobile />
        </div>
        {!profile ? (
          <Loading />
        ) : (
          <div className="bg-ps-gray-100 flex flex-col gap-6 md:p-10 p-4">
            <div>
              <BookingListDetail bookingId={bookingId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

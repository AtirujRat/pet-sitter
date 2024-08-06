import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/User";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import Loading from "@/components/Loading";
import SitterPayout from "@/components/sitters/payout/SitterPayout";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";

export default function SitterManageBookingList() {
  const { userInfo } = useUser();
  const id = userInfo?.id;
  const [profile, setProfile] = useState(null);

  const GetProfile = async () => {
    try {
      if (id) {
        const response = await axios.get(`/api/sitters/${id}`);
        setProfile(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    GetProfile();
  }, [id]);

  if (!profile) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {userInfo?.role === "sitter" ? (
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
            <div className="bg-ps-gray-100 flex flex-col gap-6 p-4 md:p-10 sm:px-10 sm:py-6 min-h-screen">
              <SitterPayout id={id} profile={profile} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
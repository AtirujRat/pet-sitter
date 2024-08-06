import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/User";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import Loading from "@/components/Loading";
import BookingList from "@/components/sitters/booking/BookingList";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";

export default function SitterManageBookingList() {
  const [profile, setProfile] = useState(null);
  const { userInfo } = useUser();
  const id = userInfo?.id;

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
    const token = localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token");
    if (!token) {
      router.push("/login/sitter");
    }

    if (+id !== userInfo.id) {
      router.push(`/sitters/${userInfo.id}/profile`);
    }
  }, []);

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
          <div className=" flex-col grow">
            <NavBarSitter
              profileImage={profile?.profile_image_url}
              fullName={profile?.full_name}
            />
            <div className="w-full">
              <SidebarSitterMobile />
            </div>
            <div className="bg-ps-gray-100 flex flex-col gap-6 px-4 md:p-10 sm:px-10 sm:py-6 min-h-screen">
              <BookingList id={id} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

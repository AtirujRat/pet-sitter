import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import NavBarSitter from "@/components/sitters/NavbarSitter";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import Loading from "@/components/Loading";
import BookingListDetail from "@/components/sitters/booking/BookingListDetail";

export default function Detail() {
  const router = useRouter();
  const { id, bookingId } = router.query;

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
    <div className="flex">
      <SideBarSitter />
      <div className="w-full flex-col">
        <NavBarSitter
          profileImage={profile?.profile_image_url}
          fullName={profile?.full_name}
        />
        <div className="bg-ps-gray-100 h-full flex flex-col gap-6 p-10">
          <div>
            <BookingListDetail bookingId={bookingId} />
          </div>
        </div>
      </div>
    </div>
  );
}

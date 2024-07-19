import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import NavBarSitter from "@/components/sitters/profile/NavbarSitter";
import SideBarSitter from "@/components/sitters/profile/SideBarSitter";
import Loading from "@/components/Loading";

export default function SitterManageBookingList() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [profile, setProfile] = useState(null);

  const GetProfile = async () => {
    try {
      if (id) {
        const response = await axios.get(`/api/sitters/${id}`);
        setProfile(response.data.data[0]);
        console.log(response.data.data[0]);
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
          <p>wi</p>
        </div>
      </div>
    </div>
  );
}

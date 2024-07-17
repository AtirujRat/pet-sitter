import SideBarSitter from "@/components/sitters/profile/SideBarSitter";
import SitterProfileForm from "@/components/sitters/profile/SitterProfileForm";
import NavBarSitter from "@/components/sitters/profile/NavbarSitter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
// import defaultImage from "../../../../public/assets/navbar/usermock.svg";

export default function SitterManageProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(null);

  const GetProfile = async () => {
    try {
      if (id) {
        const response = await axios.get(`/api/sitters/${id}`);
        console.log("Response Data:", response.data);
        setProfile(response.data.data[0]);
        // console.log(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    GetProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <SideBarSitter />
      <div className="w-full flex-col">
        <NavBarSitter
          profileImage={profile?.profile_image_url}
          fullName={profile?.full_name}
        />
        <div className="bg-ps-gray-200 h-full flex flex-col gap-6 p-10">
          <SitterProfileForm profile={{ ...profile }} />
        </div>
      </div>
    </div>
  );
}

SitterManageProfile.getLayout = function getLayout(page) {
  return (
    <>
      <SitterManageProfile />
    </>
  );
};

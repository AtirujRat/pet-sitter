import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import { supabase } from "@/utils/supabase";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import SitterProfileForm from "@/components/sitters/profile/SitterProfileForm";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import Loading from "@/components/Loading";
import { useUser } from "@/context/User";

export const SittersProfileContext = createContext();

export default function SitterManageProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [storageImages, setstorageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const CDNURL =
    "https://etraoduqrzijngbazoib.supabase.co/storage/v1/object/public/sitters_gallery/";

  async function GetProfile() {
    try {
      if (id) {
        const response = await axios.get(`/api/sitters/${id}`);
        setProfile(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  async function getImages() {
    try {
      const { data, error } = await supabase.storage
        .from("sitters_gallery")
        .list(`${id}/`, { sortBy: { column: "updated_at", order: "asc" } });
      if (error) {
        console.error("Error loading images:", error);
        throw error;
      }
      setstorageImages(data);
    } catch (error) {
      alert("Error loading images");
    }
  }

  async function removeStorageImage(imageName) {
    const { error } = await supabase.storage
      .from("sitters_gallery")
      .remove([`${profile.id}/${imageName}`]);

    if (error) {
      console.error("Error deleting image", error);
      throw error;
    }

    getImages();
  }

  useEffect(() => {
    async function fetchData() {
      await GetProfile();
      await getImages();
      setLoading(false);
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <SittersProfileContext.Provider
      value={{
        getImages,
        storageImages,
        setstorageImages,
        removeStorageImage,
        CDNURL,
      }}
    >
      <div className="flex">
        <SideBarSitter />
        <div className="w-full flex-col">
          <NavBarSitter
            profileImage={profile?.profile_image_url}
            fullName={profile?.full_name}
          />
          <div className="bg-[#F5F6F9] h-full flex flex-col gap-6 p-10">
            <SitterProfileForm profile={{ ...profile }} />
          </div>
        </div>
      </div>
    </SittersProfileContext.Provider>
  );
}

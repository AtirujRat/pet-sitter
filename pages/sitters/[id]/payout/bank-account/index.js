import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import { supabase } from "@/utils/supabase";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import Loading from "@/components/Loading";
import { useUser } from "@/context/User";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";
import PayoutBankAccount from "@/components/sitters/payout/PayoutBankAccount";

export default function SitterPayout() {
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  const [bankAccount, setBankAccount] = useState({});
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUser();

  const { id } = router.query;
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

  async function getBankAccount() {
    try {
      const res = await axios.get(`/api/sitters/${id}/payout`);
      setBankAccount(res.data.data[0]);
      if (res.data.data[0].book_bank_image_url) {
        setPreview(res.data.data[0].book_bank_image_url);
      }
    } catch (error) {
      console.error("Error fetching bank account:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token");
    if (!token) {
      router.push("/login/sitter");
    }
    async function fetchData() {
      await GetProfile();
      await getBankAccount();
      setLoading(false);
    }
    if (id) {
      fetchData();
    }
  }, []);

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
            <div className="bg-[#F5F6F9] flex flex-col gap-6 md:p-10 p-4">
              <PayoutBankAccount
                profile={{ ...profile }}
                id={id}
                loading={loading}
                preview={preview}
                setPreview={setPreview}
                bankAccount={bankAccount}
                setBankAccount={setBankAccount}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

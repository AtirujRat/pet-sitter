import axios from "axios";
import { useEffect, useState } from "react";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import Loading from "@/components/Loading";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";
import BankAccountForm from "@/components/sitters/payout/BankAccountForm";
import { useUser } from "@/context/User";

export default function SitterPayout() {
  const { userInfo } = useUser();
  const id = userInfo?.id;
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    book_bank_image: null,
    account_number: "",
    account_name: "",
    bank_id: "",
  });

  async function getProfile() {
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
      const bankData = res.data.data[0];
      setBankAccount(bankData);
      if (bankData.book_bank_image_url) {
        setPreview(bankData.book_bank_image_url);
        setInitialValues({
          book_bank_image: bankData.book_bank_image_url,
          account_number: bankData.account_number,
          account_name: bankData.account_name,
          bank_id: bankData.bank_id,
        });
      }
    } catch (error) {
      console.error("Error fetching bank account:", error);
    }
  }

  useEffect(() => {
    getProfile();
    getBankAccount();
    setLoading(false);
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
            <div className="bg-[#F5F6F9] flex flex-col gap-6 md:p-10 p-4">
              <BankAccountForm
                id={id}
                loading={loading}
                preview={preview}
                setPreview={setPreview}
                bankAccount={bankAccount}
                initialValues={initialValues}
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

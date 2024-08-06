import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";
import bell from "@/public/assets/navbar/bell.svg";
import message from "@/public/assets/navbar/message.svg";
import menu from "@/public/assets/navbar/menu.svg";
import sisterlogo from "@/public/assets/sister-logo.svg";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@/context/User";
import Anonymous from "@/components/navbar/Anonymous";
import OwnerUser from "@/components/navbar/OwnerUser";
import SitterUser from "@/components/navbar/SitterUser";

export default function LoginMobile({ setOpenModal }) {
  const [userData, setUserData] = useState();
  const { userInfo, setUserInfo } = useUser();

  async function getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (user && !userInfo.role) {
      if (
        user.app_metadata.provider !== "email" ||
        user.app_metadata.providers.includes("google")
      ) {
        const data = {
          id: user.id,
          email: user.email,
        };
        newUser(data);
      }
    }
    if (error) {
      console.error("error");
      return;
    }
    setUserData(user);

    if (!userInfo.role) {
      setUserData();
    }
  }

  const newUser = async (data) => {
    try {
      await axios.post("/api/authentication/register/owner", data);
      const id = await axios.post("/api/owner/getowners", {
        email: data.email,
      });
      setTimeout(() => {
        setUserInfo({ role: "owner", id: id.data.data });
      }, 500);
    } catch (e) {
      return;
    }
  };
  useEffect(() => {
    getUser();
  }, [userInfo]);
  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) return;
    else getUser();
    setUserData(undefined);
    setOpenModal();
    router.push("/");
  };

  return (
    <div>
      {userData !== undefined ? (
        userInfo?.role === "owner" ? (
          <OwnerUser
            userId={userInfo.id}
            userEmail={userData.email}
            setUserData={setUserData}
          />
        ) : (
          userInfo?.role === "sitter" && (
            <SitterUser userId={userInfo.id} setUserData={setUserData} />
          )
        )
      ) : (
        <Anonymous />
      )}
    </div>
  );
}

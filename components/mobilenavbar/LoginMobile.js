import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";

import profile from "@/public/assets/navbar/profile.svg";
import pet from "@/public/assets/navbar/pet.svg";
import history from "@/public/assets/navbar/history.svg";
import logout from "@/public/assets/navbar/logout.svg";

export default function LoginMobile({ setOpenModal }) {
  const [userData, setUserData] = useState();
  const router = useRouter();

  async function getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (user) {
      if (user.app_metadata.provider !== "email") {
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
  }
  const newUser = async (data) => {
    try {
      await axios.post("/api/authentication/register/owner", data);
      console.log("success");
    } catch (e) {
      console.log("errorss");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

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
        <div className="py-10 px-4 flex flex-col gap-4">
          <Link href={"/#"} className="w-full p-4 text-b1 flex gap-3">
            <Image src={profile} alt="profile" width={20} />
            Profile
          </Link>
          <Link href={"/#"} className="w-full p-4 text-b1 flex gap-3">
            <Image src={pet} alt="your pet" width={24} />
            Your Pet
          </Link>
          <Link href={"/#"} className="w-full p-4 text-b1 flex gap-3">
            <Image src={history} alt="history" width={20} />
            History
          </Link>
          <div className="border-b border-[#DCDFED]"></div>
          <div className="w-full p-4 text-b1">
            <button
              className="flex items-center gap-3"
              onClick={() => {
                handleLogout();
              }}
            >
              <Image src={logout} alt="logout" width={16} />
              Log out
            </button>
          </div>
          <Link
            href={"/sitters"}
            className="w-full py-3 text-b1 text-ps-white text-center bg-ps-orange-500 rounded-full"
          >
            Find A Pet Sitter
          </Link>
        </div>
      ) : (
        <div className="py-10 px-4 flex flex-col gap-4">
          <Link href={"/register/sitter"} className="w-full p-4 text-b1">
            Become a Pet Sitter
          </Link>
          <Link href={"/login/owner"} className="w-full p-4 text-b1">
            Login
          </Link>
          <Link
            href={"/sitters"}
            className="w-full py-3 text-b1 text-ps-white text-center bg-ps-orange-500 rounded-full"
          >
            Find A Pet Sitter
          </Link>
        </div>
      )}
    </div>
  );
}

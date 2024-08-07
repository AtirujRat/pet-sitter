import Link from "next/link";
import Image from "next/image";
import bell from "@/public/assets/navbar/bell.svg";
import message from "@/public/assets/navbar/message.svg";
import usermock from "@/public/assets/navbar/usermock.svg";
import profilemock from "@/public/assets/navbar/profile.svg";
import history from "@/public/assets/navbar/history.svg";
import logout from "@/public/assets/navbar/logout.svg";
import payout from "@/public/assets/navbar/payout.svg";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SitterUser({ userId, setUserData }) {
  const router = useRouter();
  const [profile, setProfile] = useState("");

  async function getData() {
    try {
      const data = await axios.get(`/api/sitters/${userId}`);
      setProfile(data.data.data[0].profile_image_url);
    } catch (e) {
      return;
    }
  }

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) return;
    setUserData(undefined);
    setTimeout(() => {
      localStorage.removeItem("userInfo");
      router.reload();
    }, 200);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="max-sm:hidden flex md:gap-4 gap-2 items-center">
        <Image
          src={bell}
          alt="bell"
          width={48}
          className="w-[48px] h-[48px] bg-[#F6F6F9] rounded-full cursor-pointer "
        />
        <Link href={`/sitters/messages/`}>
          <Image
            src={message}
            alt="message"
            width={48}
            className="w-[48px] h-[48px] bg-[#F6F6F9] rounded-full cursor-pointer mr-1"
          />
        </Link>

        <div className="flex rounded-full w-[48px] h-[48px] dropdown dropdown-bottom">
          <Image
            src={profile ? profile : usermock}
            alt="bell"
            className="rounded-full cursor-pointer object-cover"
            tabIndex="0"
            role="button"
            width={48}
            height={48}
          />
          <div>
            <ul
              tabIndex="0"
              className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 text-b2 drop-shadow-costom px-0"
            >
              <li className="py-2 text-b2">
                <Link href={`/sitters/profile/`}>
                  <Image src={profilemock} alt="profile" width={20} />
                  Profile
                </Link>
              </li>
              <li className="py-2 text-b2">
                <Link href={`/sitters/booking/`}>
                  <Image src={history} alt="history" width={20} />
                  History
                </Link>
              </li>
              <li className="py-2 text-b2">
                <Link href={`/sitters/payout/`}>
                  <Image src={payout} alt="payout" width={22} />
                  Payout
                </Link>
              </li>
              <div className="border-b border-[#DCDFED]"></div>
              <li
                className="py-2 cursor-pointer text-b2"
                onClick={handleLogout}
              >
                <button>
                  <Image src={logout} alt="logout" width={14} />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sm:hidden absolute top-15 right-0 size-10 bg-ps-white w-full h-full z-10">
        <div className="py-10 px-4 flex flex-col gap-4">
          <Link
            href={`/sitters/profile/`}
            className="w-full p-4 text-b1 flex gap-3"
          >
            <Image src={profilemock} alt="profile" width={20} height={20} />
            Profile
          </Link>
          <Link
            href={`/sitters/booking/`}
            className="w-full p-4 text-b1 flex gap-3"
          >
            <Image src={history} alt="history" width={20} height={20} />
            History
          </Link>
          <Link
            href={`/sitters/payout/`}
            className="w-full p-4 text-b1 flex gap-3"
          >
            <Image src={payout} alt="your pet" width={24} height={24} />
            Payout
          </Link>
          <div className="border-b border-[#DCDFED]"></div>
          <div className="w-full p-4 text-b1">
            <button className="flex items-center gap-3" onClick={handleLogout}>
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
      </div>
    </>
  );
}

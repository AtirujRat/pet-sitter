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

export default function NavBar({ setOpenModal }) {
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

  return (
    <nav className="w-full flex justify-center py-5 px-5 lg:px-0 relative z-10">
      {/* desktop */}
      <section className="max-w-[1440px] min-w-0 w-full sm:flex sm:justify-between sm:items-center lg:px-20 hidden ">
        <Link href={"/"}>
          <Image src={sisterlogo} alt="sister-logo" width={131} />
        </Link>
        <div className="flex md:gap-4 gap-2 items-center">
          {userData !== undefined ? (
            userInfo?.role === "owner" ? (
              <>
                <Image
                  src={bell}
                  alt="bell"
                  width={48}
                  className="w-[48px] h-[48px] bg-[#F6F6F9] rounded-full cursor-pointer "
                />
                <Link href={`/owners/${userId}/messages/`}>
                  <Image
                    src={message}
                    alt="message"
                    width={48}
                    className="w-[48px] h-[48px] bg-[#F6F6F9] rounded-full cursor-pointer mr-1"
                  />
                </Link>

                <div className="flex rounded-full w-[48px] h-[48px] dropdown dropdown-bottom">
                  <Image
                    src={usermock}
                    alt="bell"
                    className=" cursor-pointer"
                    tabIndex="0"
                    role="button"
                    width={48}
                  />
                  <div>
                    <ul
                      tabIndex="0"
                      className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 text-b2 drop-shadow-costom px-0"
                    >
                      <li className="py-2 text-b2">
                        <Link href={`/owners/${userId}/profile/`}>
                          <Image src={profile} alt="profile" width={20} />
                          Profile
                        </Link>
                      </li>
                      <li className="py-2 text-b2">
                        <Link href={`/owners/yourpet/ `}>
                          <Image src={pet} alt="your pet" width={22} />
                          Your Pet
                        </Link>
                      </li>
                      <li className="py-2 text-b2">
                        <Link href={`/owners/${userId}/bookinghistory/`}>
                          <Image src={history} alt="history" width={20} />
                          History
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
              </>
            ) : (
              userInfo?.role === "sitter" && (
                <SitterUser userId={userInfo.id} setUserData={setUserData} />
              )
            )
          ) : (
            <Anonymous />
          )}
          <Link href={"/sitters"}>
            <button className="items-center justify-center w-[168px] h-[48px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide ">
              Find A Pet Sitter
            </button>
          </Link>
        </div>
      </section>

      {/* Mobile */}
      <section className="sm:hidden flex justify-between items-center w-full">
        <Link href={"/"}>
          <Image src={sisterlogo} alt="sister-logo" width={80} />
        </Link>
        <div className="flex gap-2">
          <Image src={bell} alt="bell" width={48} />
          <Image src={message} alt="message" width={48} className=" mr-1" />
          <Image
            src={menu}
            alt="menu"
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => setOpenModal()}
          />
        </div>
      </section>
    </nav>
  );
}

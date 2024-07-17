import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase";
import bell from "../public/assets/navbar/bell.svg";
import message from "../public/assets/navbar/message.svg";
import usermock from "../public/assets/navbar/usermock.svg";
import profile from "../public/assets/navbar/profile.svg";
import pet from "../public/assets/navbar/pet.svg";
import history from "../public/assets/navbar/history.svg";
import logout from "../public/assets/navbar/logout.svg";
import menu from "../public/assets/navbar/menu.svg";
import sisterlogo from "../public/assets/sister-logo.svg";
import Link from "next/link";
import axios from "axios";

const NavBar = ({ setOpenModal }) => {
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();

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

    const { data: owners_id, error: getIdError } = await supabase
      .from("owners")
      .select("id")
      .eq("email", user.email);

    if (getIdError) {
      console.log(getIdError);
    }

    setUserId(owners_id[0].id);
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
  };

  return (
    <nav className="w-full flex justify-center py-5 px-5 lg:px-0 relative z-50">
      {/* desktop */}
      <section className="max-w-[1440px] min-w-0 w-full sm:flex sm:justify-between sm:items-center lg:px-20 hidden ">
        <Link href={"/"}>
          <Image src={sisterlogo} alt="sister-logo" width={131} />
        </Link>
        <div className="flex md:gap-4 gap-2 items-center">
          {userData !== undefined ? (
            <>
              <Image
                src={bell}
                alt="bell"
                width={48}
                className="w-[48px] h-[48px] bg-[#F6F6F9] rounded-full cursor-pointer "
              />
              <Image
                src={message}
                alt="message"
                width={48}
                className="w-[48px] h-[48px] bg-[#F6F6F9] rounded-full cursor-pointer mr-1"
              />

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
                      <Link href={`owners/${userId}/profile`}>
                        <Image src={profile} alt="profile" width={20} />
                        Profile
                      </Link>
                    </li>
                    <li className="py-2 text-b2">
                      <Link href={"#"}>
                        <Image src={pet} alt="your pet" width={22} />
                        Your Pet
                      </Link>
                    </li>
                    <li className="py-2 text-b2">
                      <Link href={"#"}>
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
            <>
              <Link href={"/register/sitter"}>
                <button className="py-4 px-6 text-b1">
                  Become a Pet Sitter
                </button>
              </Link>
              <Link href={"/login/owner"}>
                <button className="py-4 px-6 text-b1 ">Login</button>
              </Link>
            </>
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
};

export default NavBar;

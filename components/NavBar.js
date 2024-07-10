import { useState } from "react";
import Image from "next/image";
import bell from "../public/assets/navbar/bell.svg";
import message from "../public/assets/navbar/message.svg";
import usermock from "../public/assets/navbar/usermock.svg";
import profile from "../public/assets/navbar/profile.svg";
import pet from "../public/assets/navbar/pet.svg";
import history from "../public/assets/navbar/history.svg";
import logout from "../public/assets/navbar/logout.svg";
import Link from "next/link";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <nav className="w-full flex justify-center py-5">
      <section className=" max-w-[1440px] min-w-0 w-full flex justify-between   px-20">
        <Link href={"/"}>
          <img
            src="/assets/sister-logo.svg"
            alt="sister-logo"
            className="w-[131px]"
          />
        </Link>
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <Image src={bell} alt="bell" className=" cursor-pointer" />
              <Image src={message} alt="bell" className=" cursor-pointer" />
              <div className="bg-ps-orange-400 rounded-full w-[48px] h-[48px] dropdown dropdown-bottom">
                <Image
                  src={usermock}
                  alt="bell"
                  className=" cursor-pointer"
                  tabindex="0"
                  role="button"
                />
                <div>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 text-b2 drop-shadow-costom px-0"
                  >
                    <li className="py-2">
                      <Link href={"#"}>
                        <Image src={profile} alt="profile" className="" />
                        Profile
                      </Link>
                    </li>
                    <li className="py-2">
                      <Link href={"#"}>
                        <Image src={pet} alt="your pet" />
                        Your Pet
                      </Link>
                    </li>
                    <li className="py-2">
                      <Link href={"#"}>
                        <Image src={history} alt="history" />
                        History
                      </Link>
                    </li>
                    <div className="border-b border-[#DCDFED]"></div>
                    <li className="divide-y-2 py-2">
                      <Link href={"#"}>
                        <Image src={logout} alt="logout" />
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <button className="py-4 px-6 text-b1">Become a Pet Sitter</button>
              <Link href={"#"}>
                <button className="py-4 px-6 text-b1">Login</button>
              </Link>
            </>
          )}
          <Link href={"#"}>
            <button className="w-[168px] h-[48px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide">
              Find A Pet Sitter
            </button>
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default NavBar;

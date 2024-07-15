import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginMobile from "./mobilenavbar/LoginMobile";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { SearchProvider } from "@/pages/context/Search";

export default function Layout({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const noLayoutRoutes = [
    "/login",
    "/register",
    "/register/owner",
    "/login/owner",
    "/register/sitter",
    "/login/sitter",
    "/login/recovery",
    "/login/updatepassword",
  ];

  useEffect(() => {
    setOpenModal(false);
  }, [pathName]);

  return (
    <>
      <SearchProvider>
        <div className="w-full">
          {!noLayoutRoutes.includes(router.pathname) && (
            <NavBar setOpenModal={() => setOpenModal((prev) => !prev)} />
          )}
          {openModal && (
            <div className="absolute top-15 right-0 size-10 bg-ps-white w-full h-full z-10">
              <LoginMobile setOpenModal={() => setOpenModal((prev) => !prev)} />
            </div>
          )}
          <div>{children}</div>
          {!noLayoutRoutes.includes(router.pathname) && <Footer />}
        </div>
      </SearchProvider>
    </>
  );
}

import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginMobile from "./mobilenavbar/LoginMobile";
import { usePathname } from "next/navigation";

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
<<<<<<< HEAD
    "/login/sitter",
    "/login/recovery",
    "/login/updatepassword",
=======
>>>>>>> 28fb7cf (feat:create api get sitters by id)
    "/sitters/[id]/profile",
  ];

  const isNoLayoutRoute =
    noLayoutRoutes.includes(router.pathname) ||
    /^\/sitter\/\d+\/profile$/.test(router.pathname);

  useEffect(() => {
    setOpenModal(false);
  }, [pathName]);

  return (
    <div className="w-full">
      {!isNoLayoutRoute && (
        <NavBar setOpenModal={() => setOpenModal((prev) => !prev)} />
      )}
      {openModal && (
        <div className="absolute top-15 right-0 size-10 bg-ps-white w-full h-full z-10">
          <LoginMobile setOpenModal={() => setOpenModal((prev) => !prev)} />
        </div>
      )}
      <div>{children}</div>
      {!isNoLayoutRoute && <Footer />}
    </div>
  );
}

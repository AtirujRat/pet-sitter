import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const noLayoutRoutes = [
    "/login",
    "/register",
    "/register/owner",
    "/login/owner",
  ];

  return (
    <>
      <div>
        {!noLayoutRoutes.includes(router.pathname) && <NavBar />}
        <div>{children}</div>
        {!noLayoutRoutes.includes(router.pathname) && <Footer />}
      </div>
    </>
  );
}

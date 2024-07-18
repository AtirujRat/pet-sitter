import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginMobile from "./mobilenavbar/LoginMobile";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { SearchProvider } from "@/pages/context/Search";
import { BookingProvider } from "@/pages/context/Booking";
import { OnwerProvider } from "@/pages/context/Owners";
import { SittersProvider } from "@/pages/context/SittersList";

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
      <Head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
      </Head>
      <OnwerProvider>
        <BookingProvider>
          <SearchProvider>
            <SittersProvider>
              <div className="w-full">
                {!noLayoutRoutes.includes(router.pathname) && (
                  <NavBar setOpenModal={() => setOpenModal((prev) => !prev)} />
                )}
                {openModal && (
                  <div className="absolute top-15 right-0 size-10 bg-ps-white w-full h-full z-10">
                    <LoginMobile
                      setOpenModal={() => setOpenModal((prev) => !prev)}
                    />
                  </div>
                )}
                <div>{children}</div>
                {!noLayoutRoutes.includes(router.pathname) && <Footer />}
              </div>
            </SittersProvider>
          </SearchProvider>
        </BookingProvider>
      </OnwerProvider>
    </>
  );
}

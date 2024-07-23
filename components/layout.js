import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginMobile from "./mobilenavbar/LoginMobile";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { SearchProvider } from "@/context/Search";
import { BookingProvider } from "@/context/Booking";
import { OnwerProvider } from "@/context/Owners";
import { SittersProvider } from "@/context/SittersProvider";

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
    "/sitters/[id]/booking/[bookingId]",
  ];

  const dynamicRoutes = [
    "/sitters/[id]/profile",
    "/sitters/[id]/booking",
    "/sitters/[id]/booking/create",
  ];
  const dynamicRoutesRegex = dynamicRoutes.map(
    (route) => new RegExp(`^${route.replace("[id]", "[^/]+")}$`)
  );

  const isNoLayoutRoute =
    noLayoutRoutes.includes(router.pathname) ||
    dynamicRoutesRegex.some((regex) => regex.test(router.pathname));

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
<<<<<<< HEAD
      <OnwerProvider>
        <BookingProvider>
          <SearchProvider>
            <SittersProvider>
              <div className="w-full">
                {!isNoLayoutRoute && (
=======
      <OwnersAccountStateProvider>
        <OwnerProvider>
          <BookingProvider>
            <SearchProvider>
              <div className="w-full">
                {!noLayoutRoutes.includes(router.pathname) && (
>>>>>>> 666075e (feat:create booking history page)
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
<<<<<<< HEAD
                {!isNoLayoutRoute && <NavBar />}
              </div>
            </SittersProvider>
          </SearchProvider>
        </BookingProvider>
      </OnwerProvider>
=======
                {!noLayoutRoutes.includes(router.pathname) && <Footer />}
              </div>
            </SearchProvider>
          </BookingProvider>
        </OwnerProvider>
      </OwnersAccountStateProvider>
>>>>>>> 666075e (feat:create booking history page)
    </>
  );
}

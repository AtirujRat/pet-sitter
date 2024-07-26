import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginMobile from "./mobilenavbar/LoginMobile";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { SearchProvider } from "@/context/Search";
import { BookingProvider } from "@/context/Booking";
import { supabase } from "@/utils/supabase";

import { SittersProvider } from "@/context/SittersProvider";
import { OwnerProvider } from "@/context/Owners";
import { OwnersAccountStateProvider } from "@/context/OwnersAccountState";
import { AdminProvider } from "@/context/Admin";
import { UserProvider } from "@/context/User";
import jwtInterceptor from "@/utils/jwtinterceptor";
import CheckUserOwner from "./CheckUser";

// make sure you register this only once!
jwtInterceptor();
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
    "/admin",
  ];
  const dynamicRoutes = ["/sitters/[id]/profile", "/sitters/[id]/booking"];

  const dynamicRoutesFooter = [
    "/sitters/[id]/booking/create",
    "/owners/[id]/yourpet",
    "/owners/[id]/yourpet/create",
    "/owners/[id]/yourpet/[petId]",
  ];

  const OwnerRoute = [
    "/owners/[id]/yourpet",
    "/owners/[id]/yourpet/create",
    "/owners/[id]/yourpet/[petId]",
    "/owners/[id]/profile",
    "/owners/[id]/bookinghistory",
    "/sitters/[id]/booking/create",
  ];

  const dynamicRoutesRegex = dynamicRoutes.map(
    (route) => new RegExp(`^${route.replace("[id]", "[^/]+")}$`)
  );

  const isOwnerRoute =
    OwnerRoute.includes(router.pathname) ||
    dynamicRoutesRegex.some((regex) => regex.test(router.pathname));

  const isNoLayoutRoute =
    noLayoutRoutes.includes(router.pathname) ||
    dynamicRoutesRegex.some((regex) => regex.test(router.pathname));

  const isNoFooterRoute =
    dynamicRoutesFooter.includes(router.pathname) ||
    dynamicRoutesRegex.some((regex) => regex.test(router.pathname));

  useEffect(() => {
    setOpenModal(false);
  }, [pathName]);

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "TOKEN_REFRESHED") {
      localStorage.removeItem("sb-etraoduqrzijngbazoib-auth-token");
    }
  });
  return (
    <>
      {/* <Script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      /> */}
      <UserProvider>
        <AdminProvider>
          <OwnersAccountStateProvider>
            <OwnerProvider>
              <BookingProvider>
                <SearchProvider>
                  <SittersProvider>
                    <div className="w-full">
                      {!isNoLayoutRoute && (
                        <NavBar
                          setOpenModal={() => setOpenModal((prev) => !prev)}
                        />
                      )}
                      {openModal && (
                        <div className="absolute top-15 right-0 size-10 bg-ps-white w-full h-full z-10">
                          <LoginMobile
                            setOpenModal={() => setOpenModal((prev) => !prev)}
                          />
                        </div>
                      )}
                      {isOwnerRoute && <CheckUserOwner />}
                      <div>{children}</div>
                      {!isNoLayoutRoute && !isNoFooterRoute && <Footer />}
                    </div>
                  </SittersProvider>
                </SearchProvider>
              </BookingProvider>
            </OwnerProvider>
          </OwnersAccountStateProvider>
        </AdminProvider>
      </UserProvider>
    </>
  );
}

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
import CheckUserOwner from "@/components/CheckUserOwner";
import CheckUserSitter from "./CheckUserSitter";

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
    "/sitters/booking/[bookingId]",
    "/admin",
    "/login/admin",
    "/sitters/profile",
    "/sitters/booking",
    "/sitters/payout",
    "/sitters/payout/bank-account",
  ];
  const dynamicRoutes = [];

  const dynamicRoutesFooter = [
    "/sitters/[id]/booking/create",
    "/owners/[id]/profile",
    "/owners/yourpet",
    "/owners/yourpet/create",
    "/owners/yourpet/[petId]",
    "/owners/[id]/bookinghistory",
    "/owners/[id]/messages",
    "/404",
    "/sitters/[id]/messages",
  ];

  const OwnerRoute = [
    "/owners/yourpet",
    "/owners/yourpet/create",
    "/owners/yourpet/[petId]",
    "/owners/[id]/profile",
    "/owners/[id]/bookinghistory",
    "/sitters/[id]/booking/create",
  ];

  const SitterRoute = [
    "/sitters/booking/[bookingId]",
    "/sitters/profile",
    "/sitters/booking",
    "/sitters/payout",
    "/sitters/payout/bank-account",
  ];

  const dynamicRoutesRegex = dynamicRoutes.map(
    (route) => new RegExp(`^${route.replace("[id]", "[^/]+")}$`)
  );

  const isOwnerRoute = OwnerRoute.includes(router.pathname);

  const isSitterRoute = SitterRoute.includes(router.pathname);

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
      localStorage.removeItem("userInfo");
    }
  });
  return (
    <>
      <Script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      <UserProvider>
        <SearchProvider>
          <AdminProvider>
            <OwnersAccountStateProvider>
              <OwnerProvider>
                <SittersProvider>
                  <BookingProvider>
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
                      {isSitterRoute && <CheckUserSitter />}
                      <div>{children}</div>
                      {!isNoLayoutRoute && !isNoFooterRoute && <Footer />}
                    </div>
                  </BookingProvider>
                </SittersProvider>
              </OwnerProvider>
            </OwnersAccountStateProvider>
          </AdminProvider>
        </SearchProvider>
      </UserProvider>
    </>
  );
}

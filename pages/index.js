import HeaderHomes from "@/components/home/HeaderHome";
import ContentHomePage from "@/components/home/ContentHomePage";
import FindAPetSister from "@/components/home/FindAPetSister";
import { useSitters } from "@/context/SittersProvider";
import { useEffect } from "react";

export default function Home() {
  const { handleClearSearch } = useSitters();

  useEffect(() => {
    handleClearSearch();
  }, []);

  // const token = localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token");
  // const user = JSON.parse(token).user;
  // console.log(user);
  return (
    <section className="w-full flex-col items-center lg:pt-20 pt-10 overflow-hidden ">
      <HeaderHomes />
      <ContentHomePage />
      <FindAPetSister />
    </section>
  );
}

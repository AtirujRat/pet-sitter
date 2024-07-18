import SittersList from "@/components/sitters/SittersList";
import PageTitleDesktop from "@/components/sitters/PageTitleDesktop";
import SearchBarSitter from "@/components/sitters/searchbar/SearchBarSitter";
import PageTitleMobile from "@/components/sitters/PageTitleMobile";
import Pagination from "@/components/sitters/Pagination";
import axios from "axios";
import { useEffect } from "react";
import { useSitters } from "../context/SittersProvider";

export default function Sitters() {
  const {
    sitters,
    setSitters,
    searchName,
    petQuery,
    experience,
    setLoading,
    refresh,
    currentPage,
  } = useSitters();

  const getSitters = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/sitters?name=${searchName}&pet=${petQuery}&exp=${experience}`
    );

    if (res.statusText !== "OK") {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    setSitters(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getSitters();
  }, [refresh, currentPage]);

  return (
    <section className="w-full flex justify-center bg-ps-gray-100 sm:py-8 pt-4 lg:pb-32">
      <div className="page-container w-full sm:px-20 max-w-[1440px] flex flex-col items-center">
        <PageTitleDesktop />
        <div className="content-container flex gap-8 max-lg:flex-col lg:mb-11 w-full">
          <SearchBarSitter />
          <PageTitleMobile />
          <SittersList sitters={sitters} />
        </div>
        <Pagination />
      </div>
    </section>
  );
}

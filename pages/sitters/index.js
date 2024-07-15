import SittersList from "@/components/sitters/SittersList";
import PageTitleDesktop from "@/components/sitters/PageTitleDesktop";
import SearchBarSitter from "@/components/sitters/searchbar/SearchBarSitter";
import PageTitleMobile from "@/components/sitters/PageTitleMobile";
import Pagination from "@/components/sitters/Pagination";
import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const sittersContext = createContext();

export default function Sitters() {
  const [sitters, setSitters] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedPets, setSelectedPets] = useState([]);
  const [petQuery, setPetQuery] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [filteredRating, setFilteredRating] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

  const handleClearSearch = () => {
    setSearchName("");
    setPetQuery("");
    setSelectedPets([]);
    setExperience("");
    setSelectedRating(null);
    setFilteredRating(null);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getSitters();
  }, [refresh, currentPage]);

  return (
    <sittersContext.Provider
      value={{
        getSitters,
        handleClearSearch,
        sitters,
        setSitters,
        searchName,
        setSearchName,
        selectedPets,
        setSelectedPets,
        petQuery,
        setPetQuery,
        petQuery,
        setPetQuery,
        experience,
        setExperience,
        selectedRating,
        setSelectedRating,
        filteredRating,
        setFilteredRating,
        refresh,
        setRefresh,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        loading
      }}
    >
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
    </sittersContext.Provider>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/sitters");
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

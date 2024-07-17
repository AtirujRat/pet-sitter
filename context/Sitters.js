import { createContext, useContext } from "react";
import { useState } from "react";
import axios from "axios";

const SittersContext = createContext();

export function SitterProvider(props) {
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

  return (
    <SittersContext.Provider
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
        loading,
      }}
    >
      {props.children}
    </SittersContext.Provider>
  );
}

export const useSitters = () => useContext(SittersContext);

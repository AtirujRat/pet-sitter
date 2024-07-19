import { createContext, useState, useContext } from "react";

const SittersContext = createContext();

export function useSitters() {
  return useContext(SittersContext);
}

export function SittersProvider(props) {
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
  const [sitter, setSitter] = useState({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleClearSearch = () => {
    setSearchName("");
    setPetQuery("");
    setSelectedPets([]);
    setExperience("");
    setSelectedRating(null);
    setFilteredRating(null);
    setCurrentPage(1);
    setRefresh(!refresh);
  };

  return (
    <SittersContext.Provider
      value={{
        handleClearSearch,
        sitters,
        setSitters,
        searchName,
        setSearchName,
        selectedPets,
        setSelectedPets,
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
        setLoading,
        sitter,
        setSitter,
        isBookingModalOpen,
        setIsBookingModalOpen,
      }}
    >
      {props.children}
    </SittersContext.Provider>
  );
}

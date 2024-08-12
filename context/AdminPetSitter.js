import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useSearch } from "@/context/Search";

import {
  Approved,
  WaitingForApproval,
  Rejected,
} from "@/components/sitters/profile/SittersStatus";

const AdminPetSitterContext = createContext();
export function useAdminPetSitter() {
  return useContext(AdminPetSitterContext);
}

export function AdminPetSitterProvider(props) {
  const [sitters, setSitters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [getCurrentSitter, setGetCurrentSitter] = useState([]);
  const [selectedSitter, setSelectedSitter] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  const { location } = useSearch();

  async function GetSitterProfile() {
    try {
      const response = await axios.get(
        `/api/admin/sitters?name=${search}&tradeName=${search}&email=${search}&status=${selectedStatus}`
      );
      setSitters(response.data.data);
      if (selectedSitter) {
        const dataFilter = response.data.data.filter(
          (sitter, index) => sitter.id === selectedSitter.id
        )?.[0];
        setSelectedSitter(dataFilter);
      }

      if (response.data.data.sitters_addresses) {
        location({
          lat: Number(response.data.data.sitters_addresses.lat),
          lng: Number(response.data.data.sitters_addresses.lng),
        });
      } else {
        console.log("No address data found for this sitter.");
      }
    } catch (error) {
      console.log("Error fetching profile data");
    }
  }

  function handleSitterClick(sitter) {
    setSelectedSitter(sitter);
    setGetCurrentSitter(sitter);
  }

  const sitterStatus = {
    approved: Approved,
    waitingforapproval: WaitingForApproval,
    rejected: Rejected,
  };

  const getStatusComponent = (status) => {
    const statusKey = status?.replace(/\s+/g, "").toLowerCase();
    const StatusComponent = sitterStatus[statusKey];
    return StatusComponent ? <StatusComponent /> : status;
  };

  useEffect(() => {
    GetSitterProfile();
  }, [selectedStatus, search, refresh]);

  return (
    <AdminPetSitterContext.Provider
      value={{
        sitters,
        search,
        setSearch,
        selectedStatus,
        setSelectedStatus,
        getCurrentSitter,
        setGetCurrentSitter,
        handleSitterClick,
        selectedSitter,
        setSelectedSitter,
        getStatusComponent,
        refresh,
        setRefresh,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        GetSitterProfile,
        totalReviewPages,
        setTotalReviewPages,
        currentReviewPage,
        setCurrentReviewPage,
      }}
    >
      {props.children}
    </AdminPetSitterContext.Provider>
  );
}

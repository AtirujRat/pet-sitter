import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AdminPetOwnerContext = createContext();
export function useAdminPetOwner() {
  return useContext(AdminPetOwnerContext);
}

export function AdminPetOwnerProvider(props) {
  const [owners, setOwners] = useState([]);
  const [ownerError, setOwnerError] = useState(null);
  const [ownerLoading, setOwnerLoading] = useState(true);
  const [currentOwner, setCurrentOwner] = useState([]);
  const [currentPet, setCurrentPet] = useState();
  const [currentOwnerError, setCurrentOwnerError] = useState(null);
  const [isPetOwnerDetailModalOpened, setIspetOwnerDetailModalOpened] =
    useState(false);
  const [isBanUserModalOpened, setIsBanUserModalOpened] = useState(false);
  const [isPetsDetailModalOpened, setIsPetOwnerDetailModalOpened] =
    useState(false);

  async function getOwners() {
    try {
      const response = await axios.get("/api/owner/getowners");
      setOwners(response.data);
      setOwnerLoading(false);
    } catch {
      setOwnerError("Could not get the data");
    }
  }
  function toggleBanUserModal() {
    setIsBanUserModalOpened((prev) => !prev);
  }

  async function getCurrentOwner(email) {
    try {
      const response = await axios.get(`/api/owner/${email}/queryowner`);
      setCurrentOwner(response.data[0]);
      setCurrentOwnerError(null);
    } catch {
      setCurrentOwnerError("Could not get owner data");
    }
  }

  function toggleOwnerDetailHandle(value) {
    getCurrentOwner(value?.email);
    setIspetOwnerDetailModalOpened((prev) => !prev);
  }

  function togglePetDetailHandle(value) {
    setCurrentPet(value);
    setIsPetOwnerDetailModalOpened((prev) => !prev);
  }

  useEffect(() => {
    getOwners();
  }, [isPetOwnerDetailModalOpened]);

  return (
    <AdminPetOwnerContext.Provider
      value={{
        owners,
        currentOwner,
        setCurrentOwner,
        currentPet,
        setCurrentPet,
        ownerError,
        currentOwnerError,
        ownerLoading,
        isBanUserModalOpened,
        toggleBanUserModal,
        isPetOwnerDetailModalOpened,
        toggleOwnerDetailHandle,
        isPetsDetailModalOpened,
        togglePetDetailHandle,
        getCurrentOwner,
      }}
    >
      {props.children}
    </AdminPetOwnerContext.Provider>
  );
}

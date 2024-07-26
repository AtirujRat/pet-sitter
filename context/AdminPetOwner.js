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
  const [currentOwner, setCurrentOwner] = useState();
  const [isBanUserModalOpened, setIsBanUserModalOpened] = useState();
  const [isPetOwnerDetailOpened, setIspetOwnerDetailOpened] = useState(false);

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
    const response = await axios.get(`/api/owner/${email}/queryowner`);
    setCurrentOwner(response.data[0]);
  }

  function toggleOwnerDetailHandle(value) {
    getCurrentOwner(value?.email);
    setIspetOwnerDetailOpened((prev) => !prev);
  }

  useEffect(() => {
    getOwners();
  }, [isPetOwnerDetailOpened]);

  return (
    <AdminPetOwnerContext.Provider
      value={{
        owners,
        currentOwner,
        setCurrentOwner,
        ownerError,
        ownerLoading,
        isBanUserModalOpened,
        isPetOwnerDetailOpened,
        toggleBanUserModal,
        toggleOwnerDetailHandle,
        getCurrentOwner,
      }}
    >
      {props.children}
    </AdminPetOwnerContext.Provider>
  );
}

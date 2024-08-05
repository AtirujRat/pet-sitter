import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AdminPetOwnerContext = createContext();
export function useAdminPetOwner() {
  return useContext(AdminPetOwnerContext);
}

export function AdminPetOwnerProvider(props) {
  const [searchOwnerInput, setSearchOwnerInput] = useState("");

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
      const response = await axios.get(
        `/api/owner/getowners/?name=${searchOwnerInput}&phone_number=${searchOwnerInput}&email=${searchOwnerInput}
`
      );
      setOwners(response.data);
      setOwnerLoading(false);
      setOwnerError(null);
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

  const debounce = (func, delay = 500) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const debouncedGetOwner = debounce(getOwners, 500);
    debouncedGetOwner();
  }, [searchOwnerInput]);

  useEffect(() => {
    getOwners();
  }, [isPetOwnerDetailModalOpened]);

  return (
    <AdminPetOwnerContext.Provider
      value={{
        owners,
        currentOwner,
        searchOwnerInput,
        setSearchOwnerInput,
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

import { createContext, useState, useContext } from "react";
import { AdminPetOwnerProvider } from "./AdminPetOwner";

const AdminContext = createContext();
export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider(props) {
  const [state, setState] = useState("Pet Owner");

  return (
    <AdminContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <AdminPetOwnerProvider>{props.children}</AdminPetOwnerProvider>
    </AdminContext.Provider>
  );
}

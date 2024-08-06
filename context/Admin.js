import { createContext, useState, useContext } from "react";
import { AdminPetOwnerProvider } from "@/context/AdminPetOwner";
import { AdminReportProvider } from "@/context/AdminReports";
import { AdminPetSitterProvider } from "@/context/AdminPetSitter";
import { useSearch } from "@/context/Search";

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider(props) {
  const [state, setState] = useState("Pet Owner");

  const { address } = useSearch();

  return (
    <AdminContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <AdminReportProvider>
        <AdminPetOwnerProvider>
          <AdminPetSitterProvider>{props.children}</AdminPetSitterProvider>
        </AdminPetOwnerProvider>
      </AdminReportProvider>
    </AdminContext.Provider>
  );
}

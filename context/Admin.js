import { createContext, useState, useContext } from "react";
import { AdminPetOwnerProvider } from "@/context/AdminPetOwner";
import { AdminReportProvider } from "@/context/AdminReports";

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
      <AdminReportProvider>
        <AdminPetOwnerProvider>{props.children}</AdminPetOwnerProvider>
      </AdminReportProvider>
    </AdminContext.Provider>
  );
}

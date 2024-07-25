import { createContext, useState, useContext } from "react";

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
      {props.children}
    </AdminContext.Provider>
  );
}

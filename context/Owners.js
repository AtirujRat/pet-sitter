import { supabase } from "@/utils/supabase";
import { createContext, useContext } from "react";

const OwnerContext = createContext();

export function useOwners() {
  return useContext(OwnerContext);
}

export function OwnerProvider(props) {
  async function getUserAuth() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("error");
      return;
    }
    return user;
  }

  return (
    <OwnerContext.Provider value={{ getUserAuth }}>
      {props.children}
    </OwnerContext.Provider>
  );
}

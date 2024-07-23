import { supabase } from "@/utils/supabase";
import { createContext, useContext } from "react";

const OwnerContext = createContext();

function OwnerProvider(props) {
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

  async function getUserData() {
    const user_email = await getUserAuth();
    if (user_email) {
      const { data: owners, error } = await supabase
        .from("owners")
        .select("*")
        .eq("email", user_email.email);
      if (error) {
        console.log(error);
        return;
      }
      return owners;
    } else {
      return;
    }
  }

  return (
    <OwnerContext.Provider value={{ getUserAuth, getUserData }}>
      {props.children}
    </OwnerContext.Provider>
  );
}

const useOwners = () => useContext(OwnerContext);

export { OwnerProvider, useOwners };


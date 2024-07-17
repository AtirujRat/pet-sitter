import { supabase } from "@/utils/supabase";
import { createContext, useEffect, useState } from "react";

export const OnwerContext = createContext();

export function OnwerProvider(props) {
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();

  async function getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("error");
      return;
    }
    setUserData(user);

    const { data: owners_id, error: getIdError } = await supabase
      .from("owners")
      .select("id")
      .eq("email", user.email);

    if (getIdError) {
      console.log(getIdError);
      return;
    }

    setUserId(owners_id[0].id);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <OnwerContext.Provider value={{ userId: userId, userData: userData }}>
      {props.children}
    </OnwerContext.Provider>
  );
}

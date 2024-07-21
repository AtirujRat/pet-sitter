"use client";
import { supabase } from "@/utils/supabase";
import { createContext, useEffect, useState, useContext } from "react";

export const OnwerContext = createContext();

export function OnwerProvider(props) {
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();
  const [petData, setPetData] = useState([]);

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
      .select("*")
      .eq("email", user.email);

    if (getIdError) {
      console.log(getIdError);
      return;
    }

    setUserId(owners_id[0]);
  }
  console.log(userId);

  return (
    <OnwerContext.Provider
      value={{ userId, userData, getUser, petData, setPetData }}
    >
      {props.children}
    </OnwerContext.Provider>
  );
}

export const useOwners = () => useContext(OnwerContext);

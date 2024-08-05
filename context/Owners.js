"use client";
import { supabase } from "@/utils/supabase";
import { createContext, useContext, useState, useEffect } from "react";

const OwnerContext = createContext();

export function useOwners() {
  return useContext(OwnerContext);
}

export function OwnerProvider(props) {
  const [petData, setPetData] = useState([]);
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("user");
      return savedState ? JSON.parse(savedState) : {};
    }
  });
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

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <OwnerContext.Provider
      value={{ getUserAuth, petData, setPetData, user, setUser }}
    >
      {props.children}
    </OwnerContext.Provider>
  );
}

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@/context/User";

const SitterManageProfileContext = createContext();

export function useSitterManageProfileState() {
  return useContext(SitterManageProfileContext);
}

export function SitterManageProfileProvider(props) {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const { userInfo } = useUser();
  const id = userInfo?.id;

  async function GetProfile() {
    try {
      if (id) {
        const response = await axios.get(`/api/sitters/${id}`);
        setProfile(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  useEffect(() => {
    GetProfile();
  }, [id]);

  return (
    <SitterManageProfileContext.Provider value={{ profile }}>
      {props.children}
    </SitterManageProfileContext.Provider>
  );
}

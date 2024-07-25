import axios from "axios";
import { createContext, useState, useContext } from "react";

const UserContext = createContext();
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [userInfo, setUserInfo] = useState("");

  function getOwner() {
    setUserInfo("owner");
  }

  function getSitter() {
    setUserInfo("sitter");
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        getOwner,
        getSitter,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

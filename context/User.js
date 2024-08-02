import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [userInfo, setUserInfo] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userInfo");
      return savedState ? JSON.parse(savedState) : {};
    }
  });
  const [register, setRegister] = useState(false);
  const [registerResult, setRegisterResult] = useState("");

  function getOwner(id) {
    setUserInfo({ role: "owner", id: id });
  }

  function getSitter(id) {
    setUserInfo({ role: "sitter", id: id });
  }

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        getOwner,
        getSitter,
        register,
        setRegister,
        registerResult,
        setRegisterResult,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

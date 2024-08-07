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
  const [register, setRegister] = useState({});
  const [connection, setConnection] = useState(false);

  function getOwner(id) {
    setUserInfo({ role: "owner", id: id });
  }

  function getSitter(id) {
    setUserInfo({ role: "sitter", id: id });
  }

  function getAdmin() {
    setUserInfo({ role: "admin" });
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
        getAdmin,
        register,
        setRegister,
        setConnection,
        connection,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

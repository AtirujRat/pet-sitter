import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
const OwnersAccountStateContext = createContext();

function OwnersAccountStateProvider(props) {
  const [accountState, setAccountState] = useState("profile");
  const router = useRouter();
  const param = useParams();

  function changeAccountStateHandle(state) {
    setAccountState(state);

    router.push(`/owners/${param.id}/${state}`);
  }

  return (
    <OwnersAccountStateContext.Provider
      value={{ accountState: accountState, changeAccountStateHandle }}
    >
      {props.children}
    </OwnersAccountStateContext.Provider>
  );
}

const useOwnerAccount = () => useContext(OwnersAccountStateContext);

export { OwnersAccountStateProvider, useOwnerAccount };

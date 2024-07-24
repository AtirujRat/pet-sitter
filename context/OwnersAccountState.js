import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const OwnersAccountStateContext = createContext();

function OwnersAccountStateProvider(props) {
  const router = useRouter();
  const { id } = router.query;

  const [accountState, setAccountState] = useState(() =>
    router.pathname.split("/").pop()
  );

  function changeAccountStateHandle(state) {
    setAccountState(state);

    // router.push(`/owners/${id}/${state}`);
  }

  return (
    <OwnersAccountStateContext.Provider
      value={{
        accountState: accountState,
        changeAccountStateHandle,
      }}
    >
      {props.children}
    </OwnersAccountStateContext.Provider>
  );
}

const useOwnerAccount = () => useContext(OwnersAccountStateContext);

export { OwnersAccountStateProvider, useOwnerAccount };

import { createContext, useState } from "react";

const OwnersAccountContext = createContext();

function OwnersAccountProvider() {}

return (
  <OwnersAccount.Provider value={{}}>{props.children}</OwnersAccount.Provider>
);
export default OwnersAccountContext;

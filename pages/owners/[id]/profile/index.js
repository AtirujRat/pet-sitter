import React, { useState } from "react";

import SideBarOwners from "@/components/owners/SideBarOwners";
import Profile from "@/components/owners/Profile";

const Account = () => {
  return (
    <div className="flex gap-5 flex-col justify-center lg:flex-row  max-w-screen-xl mx-auto mt-4">
      <SideBarOwners />
      <Profile />
    </div>
  );
};

export default Account;

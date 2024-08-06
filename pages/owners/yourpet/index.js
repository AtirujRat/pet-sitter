import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import SideBarOwners from "@/components/owners/SideBarOwners";
import PetList from "@/components/owners/yourpet/PetList";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useOwnersAccountState } from "@/context/OwnersAccountState";

export default function PetListPage() {
  const router = useRouter();

  const { accountState, changeAccountStateHandle } = useOwnersAccountState();

  useEffect(() => {
    changeAccountStateHandle("yourpet");
  }, []);

  return (
    <section className="w-full h-full bg-ps-gray-100 max-md:pt-0 lg:pt-10 pb-20 max-md:pb-0">
      <div className="max-w-[1440px] min-w-0 lg:flex lg:justify-between mx-auto max-lg:flex-col lg:items-start lg:px-20  gap-9">
        <SideBarOwners />
        <div className="bg-ps-white max-sm:bg-ps-gray-100 rounded-2xl max-lg:rounded-none w-[956px] min-h-[824px] max-lg:w-full max-md:mx-auto max-sm:w-full max-md:min-h-[678px] max-lg:shadow-none p-10 max-sm:px-2 flex flex-col shadow-md gap-12">
          <div className="flex justify-between items-center">
            <p className="text-h3">Your Pet</p>
            <ButtonOrange
              text="Create Pet"
              width="w-fit"
              onClick={() => router.push(`/owners/yourpet/create`)}
            />
          </div>
          <PetList />
        </div>
      </div>
    </section>
  );
}

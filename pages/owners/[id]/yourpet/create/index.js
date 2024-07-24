import SideBarOwners from "@/components/owners/SideBarOwners";
import CreatePetForm from "@/components/owners/yourpet/CreatePetForm";
import { useRouter } from "next/router";
import Image from "next/image";
import { useOwnerAccount } from "@/context/OwnersAccountState";
import { useEffect } from "react";

export default function CreatePetPage() {
  const router = useRouter();
  const { id } = router.query;
  const { accountState, changeAccountStateHandle } = useOwnerAccount();

  useEffect(() => {
    changeAccountStateHandle("yourpet");
  }, []);

  return (
    <section className="w-full h-full bg-ps-gray-100 max-md:pt-0 pt-10 pb-20 max-sm:pb-4">
      <div className="max-w-[1440px] min-w-0 sm:flex sm:justify-between mx-auto max-md:flex-col sm:items-start lg:px-20  gap-9">
        <SideBarOwners />
        <div className="bg-ps-white max-sm:bg-ps-gray-100 rounded-2xl max-sm:rounded-none w-[956px] min-h-[824px] max-md:w-[95%] max-md:mx-auto max-sm:w-full max-md:min-h-[678px] max-sm:shadow-none p-10 max-sm:px-4 flex flex-col shadow-md gap-12">
          <div className="flex flex-col items-start gap-12 py-2">
            <button
              className="flex items-center gap-2 mb-3"
              onClick={() => router.back()}
            >
              <Image
                src="/assets/icons/icon-previous.svg"
                alt="icon-previous"
                width={24}
                height={24}
              />
              <p className="flex text-h3 gap-2">Your Pet</p>
            </button>
            <CreatePetForm
              text="Create Pet"
              width="w-fit"
              onClick={() => router.push(`/owners/${id}/yourpet/create`)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

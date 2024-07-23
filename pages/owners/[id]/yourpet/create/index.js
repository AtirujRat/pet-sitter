import SideBarOwners from "@/components/owners/SideBarOwners";
import CreatePetForm from "@/components/owners/yourpet/CreatePetForm";

export default function CreatePetPage() {
  return (
    <section className="max-w-[1440px] min-w-0 w-full sm:flex sm:justify-between mx-auto sm:items-start lg:px-20 bg-ps-gray-100 gap-5">
      <SideBarOwners />
      <CreatePetForm />
    </section>
  );
}

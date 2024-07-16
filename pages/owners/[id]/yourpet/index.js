import SideBarOwners from "@/components/owners/SideBarOwners";
import PetList from "@/components/owners/yourpet/PetList";

export default function PetListPage() {
  return (
    <section className="w-full flex justify-center bg-ps-gray-100 sm:py-8 pt-4 lg:pb-32">
      <div className="page-container w-full sm:px-20 max-w-[1440px]">
        <div className="flex gap-8 max-lg:flex-col">
          <SideBarOwners />
          <div className="w-full flex justify-start">
            <PetList />
          </div>
        </div>
      </div>
    </section>
  );
}

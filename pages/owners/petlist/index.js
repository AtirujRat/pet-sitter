import PetCard from "@/components/owners/PetCard";
import YourPet from "@/components/owners/YourPet";

export default function PetList() {
  return (
    <section className="w-full flex justify-end bg-ps-gray-100 sm:py-8 pt-4 lg:pb-32">
      <div className="page-container w-full sm:px-20 max-w-[1440px]">
        <YourPet />
      </div>
    </section>
  );
}

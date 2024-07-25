import SideBar from "@/components/admin/SideBar";
import PetOwner from "@/components/admin/PetOwner";

export default function Admin() {
  return (
    <section className="w-full flex">
      <SideBar />
      <PetOwner />
    </section>
  );
}

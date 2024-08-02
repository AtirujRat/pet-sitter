import SideBar from "@/components/admin/SideBar";
import PetOwner from "@/components/admin/PetOwner";
import { useAdmin } from "@/context/Admin";
import Report from "@/components/admin/Report";
import PetSitter from "@/components/admin/PetSitter";

export default function Admin() {
  const { state } = useAdmin();

  return (
    <section className="w-full flex bg-ps-gray-100">
      <SideBar />
      {state === "Pet Owner" && <PetOwner />}
      {state === "Pet Sitter" && <PetSitter />}
      {state === "Report" && <Report />}
    </section>
  );
}

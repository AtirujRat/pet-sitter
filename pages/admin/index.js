import SideBar from "@/components/admin/SideBar";
import PetOwner from "@/components/admin/PetOwner";
import { useAdmin } from "@/context/Admin";
import Report from "@/components/admin/Report";

export default function Admin() {
  const { state } = useAdmin();

  return (
    <section className="w-full flex">
      <SideBar />
      {state === "Pet Owner" && <PetOwner />}
      {state === "Report" && <Report />}
    </section>
  );
}

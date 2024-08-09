import UpdatePasswordForm from "@/components/authentication/UpdatePasswordForm";
import ConnectionServer from "@/components/ConnectionServer";
import SideBarOwners from "@/components/owners/SideBarOwners";
import { useUser } from "@/context/User";

export default function ChangePassword() {
  const { connection, result } = useUser();
  return (
    <section className="w-full h-full bg-ps-gray-100 max-md:pt-0 lg:pt-10 pb-20 max-md:pb-0">
      {connection && result === "success" && (
        <ConnectionServer type={"success"} text={"Change password success"} />
      )}
      {connection && result === "fail" && (
        <ConnectionServer type={"error"} text={"Error connection"} />
      )}
      <div className="max-w-[1440px] min-w-0 lg:flex lg:justify-between mx-auto max-lg:flex-col lg:items-start lg:px-20  gap-9">
        <SideBarOwners />
        <div className="w-full h-screen bg-ps-white">
          <UpdatePasswordForm api={"/api/authentication/recovery/owner"} />
        </div>
      </div>
    </section>
  );
}

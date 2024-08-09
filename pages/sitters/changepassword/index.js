import UpdatePasswordForm from "@/components/authentication/UpdatePasswordForm";
import ConnectionServer from "@/components/ConnectionServer";
import SidebarSitterMobile from "@/components/sitters/mobile/SidebarSitterMobile";
import NavBarSitter from "@/components/sitters/NavbarSitter";
import SideBarSitter from "@/components/sitters/SideBarSitter";
import { useSitterManageProfileState } from "@/context/SitterManageProfile";
import { useUser } from "@/context/User";

export default function ChangePassword() {
  const { connection, result } = useUser();
  const { profile } = useSitterManageProfileState();
  return (
    <section className="flex">
      {connection && result === "success" && (
        <ConnectionServer type={"success"} text={"Change password success"} />
      )}
      {connection && result === "fail" && (
        <ConnectionServer type={"error"} text={"Error connection"} />
      )}
      <SideBarSitter />
      <div className="w-full flex flex-col">
        <NavBarSitter
          profileImage={profile?.profile_image_url}
          fullName={profile?.full_name}
        />
        <SidebarSitterMobile />
        <div className="w-full h-screen bg-ps-gray-100">
          <UpdatePasswordForm api={"/api/authentication/recovery/sitter"} />
        </div>
      </div>
    </section>
  );
}

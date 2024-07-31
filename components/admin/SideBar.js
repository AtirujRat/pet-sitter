import Image from "next/image";
import logoSitter from "@/public/assets/admin/logo.svg";
import owner from "@/public/assets/admin/owner.svg";
import ownerActive from "@/public/assets/admin/owner-active.svg";
import sitter from "@/public/assets/admin/sitter.svg";
import sitterActive from "@/public/assets/admin/sitter-active.svg";
import report from "@/public/assets/admin/report.svg";
import reportActive from "@/public/assets/admin/report-active.svg";
import logout from "@/public/assets/admin/logout.svg";
import { useAdmin } from "@/context/Admin";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  const { state, setState } = useAdmin();
  return (
    <div className="min-w-[240px] h-screen py-4 bg-ps-black flex flex-col justify-between sticky top-0">
      <div className="w-full">
        <div className="py-10 px-6">
          <Image src={logoSitter} alt="logoSitter" />
          <p className="text-b2 text-ps-gray-400">Admin Panel</p>
        </div>

        <SideBarButton
          img={state === "Pet Owner" ? ownerActive : owner}
          name={"Pet Owner"}
          state={"Pet Owner"}
        />
        <SideBarButton
          img={state === "Pet Sitter" ? sitterActive : sitter}
          name={"Pet Sitter"}
          state={"Pet Sitter"}
        />
        <SideBarButton
          img={state === "Report" ? reportActive : report}
          name={"Report"}
          state={"Report"}
        />
      </div>
      <button className="py-4 px-6 flex gap-4 border-t-2 border-t-ps-gray-500">
        <Image src={logout} alt="logout" />
        <p className="text-b2 text-ps-gray-300">Log Out</p>
      </button>
    </div>
  );
}

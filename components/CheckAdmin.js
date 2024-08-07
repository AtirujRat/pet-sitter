import { useUser } from "@/context/User";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CheckAdmin() {
  const router = useRouter();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo.role !== "admin") {
      router.push("/login/admin");
    }
  }, []);
  return;
}

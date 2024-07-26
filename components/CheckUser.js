import { useUser } from "@/context/User";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CheckUserOwner() {
  const router = useRouter();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo !== "owner") {
      router.push("/login/owner");
    }
  }, []);
  return;
}

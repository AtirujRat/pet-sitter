import { useUser } from "@/context/User";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CheckUserSitter() {
  const router = useRouter();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo !== "sitter") {
      router.push("/login/sitter");
    }
  }, []);
  return;
}

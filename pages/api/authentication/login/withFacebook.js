import { supabase } from "@/utils/supabase";
import { redirect } from "next/dist/server/api-utils";

export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });
  if (error) {
    console.log("Error :" + error);
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

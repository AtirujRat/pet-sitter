import { supabase } from "@/utils/supabase";

export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "https://pet-sitter-seven.vercel.app/",
    },
  });
  if (error) {
    console.log("Error :" + error);
  }

  console.log(data);
}

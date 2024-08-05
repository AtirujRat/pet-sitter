import { supabase } from "@/utils/supabase";

export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `/auth/callback`,
    },
  });
  if (error) {
    console.log("Error :" + error);
  }

  console.log(data);
}

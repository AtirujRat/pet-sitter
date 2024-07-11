import { supabase } from "@/utils/supabase";

export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });

  if (error) {
    return res.status(404).json({ message: "error connection from facebook" });
  }
  return res.status(200).json({ message: data });
}

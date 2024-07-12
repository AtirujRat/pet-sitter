import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });
  console.log(data);
  if (error) {
    return res.status(404).json({ message: "error connection from google" });
  }
  return res.status(200).json({ message: data });
}

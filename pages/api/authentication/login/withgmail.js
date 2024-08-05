import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://pet-sitter-seven.vercel.app/",
        },
      });
      if (error) {
        return res
          .status(404)
          .json({ message: "error connection from google" });
      }
      return res.status(200).json({ message: data });
    } catch (e) {
      return res.status(404).json({ message: "error connection from google" });
    }
  }
}

import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { email } = req.body;

  if (req.method === "POST") {
    try {
      const { data: owners, error } = await supabase
        .from("owners")
        .select("*")
        .eq("email", email);

      if (error) {
        return res.status(400).json({ message: "Owners not found" });
      }

      return res.status(200).json(owners);
    } catch {
      return res
        .status(500)
        .json({ message: "Could not get owners data because database issue" });
    }
  }
}

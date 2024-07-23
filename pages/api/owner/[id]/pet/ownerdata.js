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
        return res.status(400).json({ message: "Cound not found owners" });
      }

      return res.status(200).json(owners);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch owners" });
    }
  }
}

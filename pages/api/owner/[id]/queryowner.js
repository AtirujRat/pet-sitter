import { supabase } from "@/utils/supabase";
import protect from "../../protect";

export default async function handler(req, res) {
  protect(req, res);
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data: owners, error } = await supabase
        .from("owners")
        .select("*, pets(*)")
        .eq("email", id);

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

import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data: owners, error } = await supabase
        .from("owners")
        .select("*, pets(name)");

      if (error) {
        return res.status(400).json({
          message: "Could not the get data because wrong data incoming",
        });
      }

      return res.status(200).json(owners);
    } catch {
      return res.status(500).json({
        message: "Could not the get data because database connection",
      });
    }
  }
}

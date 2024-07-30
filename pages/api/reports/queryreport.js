import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      let { data: reports, error } = await supabase
        .from("reports")
        .select(
          `* , bookings(owners:owner_id (full_name) , sitters:sitter_id (full_name) )`
        )
        .eq("id", id);

      if (error) {
        return res
          .status(400)
          .json({ message: "Could not get reports maybe wrong data incoming" });
      }

      return res.status(200).json(reports);
    } catch {
      return res
        .status(500)
        .json({ message: "error connection from database" });
    }
  }
}

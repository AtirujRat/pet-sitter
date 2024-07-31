import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const updatedReport = {
      ...req.body,
      updated_at: new Date(),
    };
    try {
      const { data, error } = await supabase
        .from("reports")
        .update(updatedReport)
        .eq("id", id)
        .select();
      if (error) {
        return res.status(400).json({
          message: "Could not updated report maybe wrong data incoming",
        });
      }

      return res.status(200).json({ message: "Report has been update" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not updated report becasue database issue" });
    }
  }

  if (req.method === "POST") {
    const newReport = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    };
    try {
      const { data, error } = await supabase
        .from("reports")
        .insert(newReport)
        .select();
      if (error) {
        return res.status(400).json({
          message: "Could not create report maybe wrong data incoming",
        });
      }

      return res.status(200).json({ message: "Report has been sent" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not create report becasue database issue" });
    }
  }

  if (req.method === "GET") {
    try {
      let { data: reports, error } = await supabase
        .from("reports")
        .select(
          `* , bookings(owners:owner_id (full_name) , sitters:sitter_id (full_name) )`
        );

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

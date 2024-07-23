import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
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
          message: "Could not send the report maybe wrong data incoming",
        });
      }

      return res.status(200).json({ message: "Report has been sent" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not send the report becasue database issue" });
    }
  }
}

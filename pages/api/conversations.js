import protect from "./protect";
import { supabase } from "@/utils/supabase";

export default async function handle(req, res) {
  protect(req, res);
  if (req.method === "POST") {
    const { sitter_id, owner_id } = req.body;
    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert([{ sitter_id: sitter_id, owner_id: owner_id }])
        .select();

      if (error) {
        return res
          .status(400)
          .json({ message: "error connection from database" });
      }
      return res.status(200).json({ message: "create conversation success" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }
  }
}

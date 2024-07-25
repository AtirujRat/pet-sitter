import { supabase } from "@/utils/supabase";
import protect from "../protect";

export default async function handler(req, res) {
  protect(req, res);
  if (req.method === "POST") {
    const { id } = req.body;
    try {
      let { data: pets, errors } = await supabase
        .from("pets")
        .select("*")
        .eq("owner_id", id);

      if (errors) {
        return res.status(400).json("error connection from database");
      }

      return res.status(200).json({ data: pets });
    } catch (e) {
      return res.status(400).json("error connection from database");
    }
  }
}

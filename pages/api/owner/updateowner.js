import { supabase } from "@/utils/supabase";
import protect from "../protect";

export default async function handler(req, res) {
  protect(req, res);
  const { id } = req.body;
  if (req.method === "PUT") {
    const updatedOwner = {
      ...req.body,
      updated_at: new Date(),
    };

    try {
      const { data, error } = await supabase
        .from("owners")
        .update(updatedOwner)
        .eq("id", id)
        .select();

      if (error) {
        return res.status(400).json({ message: "Could not update profile" });
      }

      return res.status(200).json({ message: "Profile has been updated" });
    } catch {
      return res
        .status(500)
        .json({ message: "Could not update profile because database issue" });
    }
  }
}

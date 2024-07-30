import { supabase } from "@/utils/supabase";
import protect from "../../protect";

export default async function handler(req, res) {
  const { id } = req.query;
  protect(req, res);
  if (req.method === "GET") {
    try {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select(
          "*, messages(*), sitters(full_name, profile_image_url), owners(full_name, profile_image_url)"
        )
        .eq("owner_id", id);

      if (error) {
        throw error;
      }

      if (conversations.length === 0) {
        return res.status(404).json({
          message: `Server could not find any requested conversations to show for owner id ${id}`,
        });
      }

      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not read conversations because of a database connection error",
      });
    }
  }
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
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

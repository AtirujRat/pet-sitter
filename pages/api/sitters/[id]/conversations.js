import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select(
          "*, messages(*), sitters(full_name, profile_image_url), owners(full_name, profile_image_url)"
        )
        .eq("sitter_id", id);

      if (error) {
        throw error;
      }

      if (conversations.length === 0) {
        return res.status(404).json({
          message: `Server could not find any requested conversations to show for sitter id ${id}`,
        });
      }

      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not read conversations because of a database connection error",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

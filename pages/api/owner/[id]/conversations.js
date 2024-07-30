import { supabase } from "@/utils/supabase";
// import protect from "../../protect";

export default async function handler(req, res) {
  const { id } = req.query;
  // protect(req, res);
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
      let { data: conversations, error: errors } = await supabase
        .from("conversations")
        .select("*")
        .eq("owner_id", owner_id)
        .eq("sitter_id", sitter_id);

      if (!conversations[0]) {
        const { data, error } = await supabase
          .from("conversations")
          .insert([{ sitter_id: sitter_id, owner_id: owner_id }])
          .select();

        if (errors) {
          return res
            .status(400)
            .json({ message: "error connection from database" });
        }
        return res.status(200).json({ message: "create conversation success" });
      } else {
        const { data, error } = await supabase
          .from("conversations")
          .update({ updated_at: new Date() })
          .eq("owner_id", owner_id)
          .eq("sitter_id", sitter_id)
          .select();

        if (error) {
          return res
            .status(400)
            .json({ message: "error connection from database" });
        }
        return res
          .status(201)
          .json({ message: "already create conversation success" });
      }
    } catch (e) {
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }
  }
  if (req.method === "PUT") {
    const { id } = req.body;
    console.log(id);

    const { data, error } = await supabase
      .from("messages")
      .update([{ owner_status: "read" }])
      .eq("conversation_id", id)
      .eq("sender_role", "sitter")
      .select();

    if (error) {
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }
    return res.status(200).json({ message: "create conversation success" });
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

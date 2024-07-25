import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select("*, messages(*), sitters(full_name, profile_image_url)")
        .eq("owner_id", id);

      if (error) {
        throw error;
      }

      if (conversations.length === 0) {
        return res.status(404).json({
          message: `Server could not find conversations for owner id ${id}`,
        });
      }

      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not read conversations because of a database connection error",
        error: error.message,
      });
    }
  } else if (req.method === "POST") {
    const { conversation_id, text, sender_role } = req.body;

    if (!conversation_id || !text || !sender_role) {
      return res.status(400).json({
        message: "Missing required fields: text and sender_role",
      });
    }

    try {
      const { newMessage, error } = await supabase.from("messages").insert([
        {
          conversation_id,
          text,
          sender_role,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to add message to the database",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
    });
  }
}

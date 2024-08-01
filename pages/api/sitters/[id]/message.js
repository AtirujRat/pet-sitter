import { supabase } from "@/utils/supabase";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { conversation_id, text, message_image_url, sender_role } = req.body;
    if (text) {
      try {
        const { error } = await supabase.from("messages").insert([
          {
            conversation_id: conversation_id,
            text: text,
            sender_role: sender_role,
            sitter_status: "send",
            owner_status: "unread",
          },
        ]);
        if (error) throw error;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      try {
        const { error } = await supabase.from("messages").insert([
          {
            conversation_id: conversation_id,
            message_image_url: message_image_url,
            sender_role: sender_role,
            sitter_status: "send",
            owner_status: "unread",
          },
        ]);
        if (error) throw error;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }
}

import { supabase } from "@/utils/supabase";
import protect from "../protect";

export default async function handler(req, res) {
  protect(req, res);
  if (req.method === "POST") {
    const newRating = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    };
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert(newRating)
        .select();
      if (error) {
        return res.status(400).json({
          message: "Could not send your review maybe wrong data incoming.",
        });
      }

      return res.status(200).json({ message: "Your review has been sent." });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Could not send your review becasue database issue.",
        });
    }
  }

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("reviews").select(`*,
        bookings(owner_id, sitters:sitter_id (full_name,profile_image_url) )
        `);

      if (error) {
        return res
          .status(400)
          .json({
            message: "Could not get reports maybe wrong data incoming.",
          });
      }

      return res.status(200).json(data);
    } catch {
      return res
        .status(500)
        .json({ message: "error connection from database." });
    }
  }
}

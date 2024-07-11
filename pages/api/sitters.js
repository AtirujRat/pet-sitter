import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let { data: sitters, error } = await supabase
        .from("sitters")
        .select(
          "id, full_name, trade_name, profile_image_url, sitters_images(image_url), pet_types(id,pet_type), bookings(reviews!inner(rating))"
        )
        .eq("sitter_status", "approved");

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: sitters,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

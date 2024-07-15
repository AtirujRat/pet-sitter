import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      let { data: sitters, error } = await supabase
        .from("sitters")
        .select(
          "*, sitters_images(image_url), bookings(reviews!inner(rating))"
        )
        .eq("id", id);

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

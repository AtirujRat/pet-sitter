import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("bookings")
        .select("*, pets(name, type, pet_image_url)")
        .eq("id", id);

      let { data: booking, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

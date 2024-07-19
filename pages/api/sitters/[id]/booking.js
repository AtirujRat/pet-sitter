import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase.from("bookings").select("*, sitters(id)");

      let { data: bookings, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: bookings,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

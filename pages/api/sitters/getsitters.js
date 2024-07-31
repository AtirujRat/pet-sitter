import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id, name, tradeName, email, status } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase.from("sitters").select(
        `
          *,
          bookings(reviews(rating, status)),
          sitters_addresses(*),
          sitters_images(image_url)
        `
      );

      if (name || tradeName || email) {
        const filters = [];
        if (name) filters.push(`full_name.ilike.%${name}%`);
        if (tradeName) filters.push(`trade_name.ilike.%${tradeName}%`);
        if (email) filters.push(`email.ilike.%${email}%`);

        supabaseQuery = supabaseQuery.or(filters.join(","));
      }

      if (status) {
        supabaseQuery = supabaseQuery.eq("sitter_status", status);
      }

      let { data: sitters, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: sitters,
      });
    } catch (error) {
      console.error("Error in API handler:", error);
      return res.status(500).json({
        message:
          "Server could not read sitters because of database connection issue.",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

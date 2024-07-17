import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const tradeName = req.query.name;
  const petType = [req.query.pet];
  const experience = req.query.exp;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("sitters")
        .select(
          "id, full_name, trade_name, profile_image_url, pet_types, sitters_images(image_url), bookings(reviews!inner(rating, status))"
        )
        .eq("sitter_status", "approved")
        .order("id", { ascending: true })
        .ilike("trade_name", `%${tradeName}%`)
        .contains("pet_types", petType);

      if (experience) {
        supabaseQuery = supabaseQuery.eq("experience", experience);
      }

      let { data: sitters, error } = await supabaseQuery;

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

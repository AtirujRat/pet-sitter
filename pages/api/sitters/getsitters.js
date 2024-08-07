import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { name, tradeName, email, status } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("sitters")
        .select(
          `
          *,
          bookings(reviews!inner(id, rating, description, status, updated_at), owners(full_name, profile_image_url)),
          sitters_addresses(*),
          sitters_images(image_url)
        `
        )
        .order("sitter_status", { ascending: false })
        .not("sitter_status", "is", null);

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

      supabaseQuery = supabaseQuery.eq("bookings.reviews.status", "pending");

      let { data: sitters, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: sitters,
      });
    } catch (error) {
      console.error("Error in API handler");
      return res.status(500).json({
        message:
          "Server could not read sitters because of database connection issue.",
      });
    }
  }
  if (req.method === "PATCH") {
    try {
      const id = req.body.id;
      const updatedStatus = req.body.sitter_status;
      const rejectReason = req.body.reject_reason;

      const { data, error } = await supabase
        .from("sitters")
        .update({ sitter_status: updatedStatus, reject_reason: rejectReason })
        .eq("id", id)
        .select();

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Server could not find a sitters to update",
        });
      }

      return res.status(200).json({
        message: "sitters status was updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not update the sitters because database connection",
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

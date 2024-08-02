import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;
  const ownerName = req.query.name;
  const status = req.query.status;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("bookings")
        .select(
          "id, owners!inner(full_name), bookings_pets(pet_id), start_time, end_time, status, price, transaction_id, created_at, payment_method"
        )
        .eq("sitter_id", id)
        .ilike("owners.full_name", `%${ownerName}%`);

      if (status) {
        if (Array.isArray(status)) {
          supabaseQuery = supabaseQuery.in("status", status);
        } else {
          supabaseQuery = supabaseQuery.eq("status", status);
        }
      }
      let { data: bookings, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: bookings,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server could not read bookings because database connection",
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

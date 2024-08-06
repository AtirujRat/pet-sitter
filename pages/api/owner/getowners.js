import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { name, phone_number, email } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("owners")
        .select("*, pets(*), bookings(id ,reviews(*))")
        .order("full_name", { ascending: true });

      if (name || phone_number || email) {
        const filters = [];
        if (name) filters.push(`full_name.ilike.%${name}%`);
        if (phone_number) filters.push(`phone_number.ilike.%${phone_number}%`);
        if (email) filters.push(`email.ilike.%${email}%`);

        supabaseQuery = supabaseQuery.or(filters.join(","));
      }

      let { data: owners, error } = await supabaseQuery;

      if (error) {
        throw error;
      }

      return res.status(200).json(owners);
    } catch (error) {
      console.error("Error in API handler:", error);
      return res.status(500).json({
        message:
          "Server could not read sitters because of database connection issue.",
        error: error.message,
      });
    }
  }
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const { data: owners_id, error: getIdError } = await supabase
        .from("owners")
        .select("id")
        .eq("email", email);

      if (getIdError) {
        return res.status(400).json({
          message: "error connection",
        });
      }

      return res.status(200).json({
        data: owners_id[0].id,
      });
    } catch (e) {
      return res.status(400).json({
        message: "error connection",
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

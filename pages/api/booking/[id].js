import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("bookings")
        .select(
          "*, pets(name, type, pet_image_url, breed, age, color, sex, weight, description), owners(full_name, email, phone_number, profile_image_url, id_number, date_of_birth)"
        )
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
  } else if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const updatedStatus = req.body.status;

      const { data, error } = await supabase
        .from("bookings")
        .update({ status: updatedStatus })
        .eq("id", id)
        .select();

      return res.status(200).json({
        message: "Booking status was updated successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

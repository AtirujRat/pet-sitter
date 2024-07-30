import { supabase } from "@/utils/supabase";
import protect from "../protect";

export default async function handler(req, res) {
  protect(req, res);
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      let supabaseQuery = supabase
        .from("bookings")
        .select(
          "*, pets(name, type, pet_image_url, breed, age, color, sex, weight, description), owners(full_name, email, phone_number, profile_image_url, id_number, date_of_birth), reviews(*)"
        )
        .eq("id", id);

      let { data: booking, error } = await supabaseQuery;

      if (!booking || booking.length === 0) {
        return res.status(404).json({
          message: "Server could not find the request booking",
        });
      }

      return res.status(200).json({
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not read the booking because database connection",
      });
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

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Server could not find a booking to update",
        });
      }

      return res.status(200).json({
        message: "Booking status was updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not update the booking because database connection",
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

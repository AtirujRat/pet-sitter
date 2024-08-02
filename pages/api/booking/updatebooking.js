import { supabase } from "@/utils/supabase";
import protect from "../protect";

export default async function handler(req, res) {
  //   protect(req, res);
  const { id } = req.query;
  if (req.method === "PUT") {
    const updatedBooking = {
      ...req.body,
      last_updated: new Date(),
    };
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update(updatedBooking)
        .eq("id", id)
        .select();

      if (error) {
        return res.status(400).json({ message: "Could not update booking" });
      }

      return res.status(200).json({ message: "Booking has been updated" });
    } catch {
      return res
        .status(500)
        .json({ message: "Could not update Booking because database issue" });
    }
  }
}

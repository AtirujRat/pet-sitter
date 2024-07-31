import { supabase } from "@/utils/supabase";
import protect from "@/pages/api/protect";

export default async function handler(req, res) {
  protect(req, res);
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data: bookingList, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          start_time,
          end_time,
          status,
          created_at,
          last_updated,
          price,
          message,
          sitters (
            full_name,
            trade_name,
            profile_image_url
          )
            , pets(name)
        `
        )
        .eq("owner_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        return res
          .status(400)
          .json({ message: "Could not found Booking List" });
      }
      return res.status(200).json(bookingList);
    } catch (error) {
      return res.status(500).json({ message: "Fail to fetch Booking List" });
    }
  }
}

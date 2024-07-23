import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.body;

  if (req.method === "POST") {
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

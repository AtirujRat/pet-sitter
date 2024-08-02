import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      owner_id,
      sitter_id,
      start_time,
      end_time,
      status,
      price,
      message,
      pet_id,
    } = req.body;
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            owner_id: owner_id,
            sitter_id: sitter_id,
            start_time: new Date(start_time),
            end_time: new Date(end_time),
            status: status,
            price: price,
            message: message,
          },
        ])
        .select();

      pet_id.map(async (id) => {
        let { data: bookings, errors } = await supabase
          .from("bookings")
          .select("id")
          .eq("owner_id", owner_id);

        const { data, error } = await supabase
          .from("bookings_pets")
          .insert([{ booking_id: bookings[0].id, pet_id: id }])
          .select();
        return;
      });

      if (error) {
        return res.status(400).json({ message: "Error from insert data" });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Error connection from supabase" });
    }
    return res.status(200).json({ message: "booking successful" });
  }
}

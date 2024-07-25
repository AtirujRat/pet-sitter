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
            created_at: new Date(),
            last_updated: new Date(),
          },
        ])
        .select();

      pet_id.map(async (id) => {
        let bookings = supabase
          .from("bookings")
          .select("id")
          .eq("owner_id", owner_id);
        if (sitter_id) {
          bookings = bookings.eq("sitter_id", sitter_id);
        }
        if (status) {
          bookings = bookings.eq("status", status);
        }
        const { data, error } = await bookings;

        if (error) {
          return res.status(400).json({ message: "Error from insert data" });
        }

        const { datas, errors } = await supabase
          .from("bookings_pets")
          .insert([{ booking_id: data[0].id, pet_id: id }])
          .select();

        if (errors) {
          return res.status(400).json({ message: "Error from insert data" });
        }
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

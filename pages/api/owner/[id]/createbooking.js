import { supabase } from "@/utils/supabase";
import protect from "@/pages/api/protect";

export default async function handler(req, res) {
  protect(req, res);
  if (req.method === "GET") {
    const { id } = req.query;
    let { data: bookings, error } = await supabase
      .from("bookings")
      .select(
        "*, sitters(full_name, trade_name), bookings_pets(booking_id, pet_id), pets(name)"
      )
      .eq("owner_id", id);
    return res.status(200).json({ data: bookings });
  }
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
      payment_method,
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
            payment_method: payment_method,
          },
        ])
        .select();

      if (error) {
        return res.status(400).json({ message: "Error from insert data" });
      }

      const { data: datas, error: errors } = await supabase
        .from("bookings")
        .select("id")
        .eq("owner_id", owner_id)
        .eq("sitter_id", sitter_id)
        .eq("status", status);

      if (errors) {
        return res.status(400).json({ message: "Error from insert data" });
      }
      pet_id.map(async (id) => {
        const { data, error } = await supabase
          .from("bookings_pets")
          .insert([{ booking_id: datas[datas.length - 1].id, pet_id: id }])
          .select();

        if (error) {
          return res.status(400).json({ message: "Error from insert data" });
        }
        return;
      });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Error connection from supabase" });
    }
    return res.status(200).json({ message: "booking successful" });
  }
}

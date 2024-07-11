import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("sitters")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

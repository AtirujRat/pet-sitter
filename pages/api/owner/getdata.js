import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;
    console.log(req.body);

    let { data: pets, errors } = await supabase
      .from("pets")
      .select("*")
      .eq("owner_id", id);
    if (errors) {
      return res.status(400).json("error connection from database");
    }

    return res.status(200).json(pets);
  }
}

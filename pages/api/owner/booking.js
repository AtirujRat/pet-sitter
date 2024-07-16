import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    let { data: owners, error } = await supabase
      .from("owners")
      .select("id")
      .eq("email", email);

    if (error) {
      return res.status(400).json("error connection from database");
    }

    let { data: pets, errors } = await supabase
      .from("pets")
      .select("*")
      .eq("owner_id", owners[0].id);

    if (errors) {
      return res.status(400).json("error connection from database");
    }

    return res.status(200).json(pets);
  }
}

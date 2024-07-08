import { supabase } from "../../../utils/supabase.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const newSitter = req.body;
  if (!newSitter) {
    return res.status(404).json({ message: "missing data from request" });
  }

  const salt = await bcrypt.genSalt(10);
  newSitter.password = await bcrypt.hash(newSitter.password, salt);

  console.log(newSitter);
  const { data, error } = await supabase
    .from("sitters")
    .insert([
      {
        email: newSitter.email,
        password: newSitter.password,
        phone_number: newSitter.phone,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    return res.status(404).json({ name: "error connection from database" });
  }
  return res.status(200).json({ name: "register success" });
}

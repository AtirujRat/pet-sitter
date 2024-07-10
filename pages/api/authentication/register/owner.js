import { supabase } from "../../../utils/supabase.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const newOwner = req.body;
  if (!newOwner) {
    return res.status(404).json({ message: "missing data from request" });
  }

  let { data, error } = await supabase.auth.signUp({
    email: newOwner.email,
    password: newOwner.password,
    phone: newOwner.phone,
  });
  console.log(error);
  if (error) {
    return res.status(400).json({ name: "error connection from database" });
  }

  const salt = await bcrypt.genSalt(10);
  newOwner.password = await bcrypt.hash(newOwner.password, salt);

  const { datas, errors } = await supabase
    .from("owners")
    .insert([
      {
        email: newOwner.email,
        password: newOwner.password,
        phone_number: newOwner.phone,
      },
    ])
    .select();
  console.log(10);
  if (errors) {
    return res.status(400).json({ name: "error connection from database" });
  }
  return res.status(200).json({ name: "register success" });
}

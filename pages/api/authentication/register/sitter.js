import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const newSitter = req.body;
  if (!newSitter.email || !newSitter.password || !newSitter.phone) {
    return res.status(404).json({ message: "missing data from request" });
  }

  const salt = await bcrypt.genSalt(10);
  newSitter.password = await bcrypt.hash(newSitter.password, salt);

  let { data, error } = await supabase.auth.signUp({
    email: newSitter.email,
    password: newSitter.password,
    phone_number: newSitter.phone,
  });
  if (error) {
    console.log(error);
    return res.status(400).json({ message: "error connection from database" });
  }

  const { datas, errors } = await supabase
    .from("sitters")
    .insert([
      {
        email: newSitter.email,
        password: newSitter.password,
        phone_number: newSitter.phone,
      },
    ])
    .select();
  if (errors) {
    return res.status(400).json({ message: "error connection from database" });
  }
  const { user, e } = await supabase
    .from("email_supabase")
    .insert([
      {
        email: newSitter.email,
        password: newSitter.password,
      },
    ])
    .select();
  if (e) {
    return res.status(200).json({ message: "register success" });
  }
  return res.status(200).json({ message: "register success" });
}

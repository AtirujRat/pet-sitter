import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password, phone } = req.body;
  if (!email || !password || !phone) {
    return res.status(404).json({ message: "missing data from request" });
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    phone_number: phone,
  });
  if (error) {
    console.log(error);
    return res.status(400).json({ message: "error connection from database" });
  }

  const { datas, errors } = await supabase
    .from("sitters")
    .insert([
      {
        email: email,
        password: password,
        phone_number: phone,
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
        email: email,
        password: password,
      },
    ])
    .select();
  if (e) {
    return res.status(200).json({ message: "register success" });
  }
  return res.status(200).json({ message: "register success" });
}

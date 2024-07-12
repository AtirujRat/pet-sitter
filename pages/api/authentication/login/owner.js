import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const { data, error } = await supabase
    .from("owners")
    .select("email, password")
    .eq("email", email)
    .single();

  if (error) {
    return res.status(400).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  let { data: email_supabase, errors } = await supabase
    .from("email_supabase")
    .select("*")
    .eq("email", email);
  if (errors) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res
    .status(200)
    .json({ message: "Login success", data: email_supabase });
}

import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let { data: sitter, error } = await supabase
    .from("sitters")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !sitter) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, sitter.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
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

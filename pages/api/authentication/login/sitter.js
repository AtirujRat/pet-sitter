import { supabase } from "../../../utils/supabase.js";
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

  return res
    .status(200)
    .json({ message: "Login successful", sitterId: sitter.id });
}

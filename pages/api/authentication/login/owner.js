import { supabase } from "../../../utils/supabase.js";
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

  const { session, error: authError } = await supabase.auth.signIn({
    email: email,
    password: password,
  });

  if (authError) {
    return res.status(400).json({ message: "Failed to sign in" });
  }

  return res.status(200).json({ message: "Login success", session });
}

import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "missing data from request" });
  }
  try {
    const { data, error } = await supabase
      .from("owners")
      .select("email, password, id")
      .eq("email", email)
      .single();

    if (error) {
      return res
        .status(400)
        .json({ message: "error connection from database" });
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
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }

    return res
      .status(200)
      .json({
        message: "Sign in success",
        data: [{ ...email_supabase[0], id: data.id }],
      });
  } catch (e) {
    return res.status(400).json({ message: "error connection from database" });
  }
}

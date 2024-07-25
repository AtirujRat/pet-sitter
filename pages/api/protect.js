import jwt from "jsonwebtoken";
import { supabase } from "@/utils/supabase";

const JWT_SECRET = process.env.JWT_SECRET;
export default async function protect(req, res) {
  // console.log(req.headers);
  const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error };
    }
  };
  const token = req.headers.authorization?.split(" ")[1];
  const access_token = JSON.parse(token).access_token;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  const { valid, decoded, error } = verifyToken(access_token);

  if (!valid) {
    return res.status(401).json({ error: "Invalid token", details: error });
  }

  // Token is valid, proceed with your API logic
  const { data, error: supabaseError } = await supabase
    .from("owners")
    .select("*")
    .eq("id", 43);

  if (supabaseError) {
    return res.status(500).json({ error: supabaseError.message });
  }

  return res.status(200).json(data);
}

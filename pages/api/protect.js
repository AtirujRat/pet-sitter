import jwt from "jsonwebtoken";
import { supabase } from "@/utils/supabase";

const JWT_SECRET = process.env.JWT_SECRET;
export default async function protect(req, res) {
  // const verifyToken = (token) => {
  //   try {
  //     const decoded = jwt.verify(token, JWT_SECRET);
  //     return { valid: true, decoded };
  //   } catch (error) {
  //     return { valid: false, error };
  //   }
  // };
  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) {
  //   return res.status(401).json({ error: "Missing token" });
  // }
  // const { valid, decoded, error } = verifyToken(token);
  // if (!valid) {
  //   return res.status(401).json({ error: "Invalid token", details: error });
  // }
  // Token is valid, proceed with your API logic
}

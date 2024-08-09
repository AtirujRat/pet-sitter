import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { newPassword } = req.body;

    if (!newPassword) {
      return res.status(404).json({ message: "missing data from request" });
    }

    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    return res.status(200).json({ data: newPassword });
  }
  if (req.method === "PUT") {
    const { email, password } = req.body;
    try {
      const { data: datas, error: errors } = await supabase
        .from("owners")
        .update([
          {
            password: password,
          },
        ])
        .select()
        .eq("email", email);
      if (errors) {
        return res
          .status(400)
          .json({ message: "error connection from database" });
      }

      const { user, e } = await supabase
        .from("email_supabase")
        .update([
          {
            password: password,
          },
        ])
        .select()
        .eq("email", email);
      if (e) {
        return res
          .status(400)
          .json({ message: "error connection from database" });
      }

      return res.status(201).json({ message: "reset password successful" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }
  }
}

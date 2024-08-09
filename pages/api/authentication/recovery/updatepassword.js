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

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }

    // const { data: datas, error: errors } = await supabase
    //   .from("sitters")
    //   .update([
    //     {
    //       password: newPassword,
    //     },
    //   ])
    //   .select()
    //   .eq("email", "ponnakim34@gmail.com");
    // if (errors) {
    //   return res
    //     .status(400)
    //     .json({ message: "error connection from database" });
    // }
    // const { user, e } = await supabase
    //   .from("email_supabase")
    //   .update([
    //     {
    //       password: newPassword,
    //     },
    //   ])
    //   .select()
    //   .eq("email", "ponnakim34@gmail.com");
    // if (e) {
    //   return res.status(200).json({ message: "register success" });
    // }
    return res.status(200).json({ message: "register success" });
  }
}

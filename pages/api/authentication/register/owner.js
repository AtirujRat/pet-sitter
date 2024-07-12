import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newOwner = req.body;
    if (newOwner.id) {
      let { data: owners, error } = await supabase
        .from("owners")
        .select("id_provider")
        .eq("id_provider", newOwner.id);
      if (error) {
        return res
          .status(400)
          .json({ message: "error connection from database" });
      }
      if (!owners[0]) {
        const { data, error } = await supabase
          .from("owners")
          .insert([
            {
              id_provider: newOwner.id,
              email: newOwner.email,
            },
          ])
          .select();
        if (error) {
          return res
            .status(400)
            .json({ message: "error connection from database" });
        }
        return res.status(200).json({ message: "register success" });
      }

      return res.status(201).json({ message: "User have already register" });
    }

    if (!newOwner.email || !newOwner.password || !newOwner.phone) {
      return res.status(404).json({ message: "missing data from request" });
    }

    const salt = await bcrypt.genSalt(10);
    newOwner.password = await bcrypt.hash(newOwner.password, salt);

    let { data, error } = await supabase.auth.signUp({
      email: newOwner.email,
      password: newOwner.password,
      phone: newOwner.phone,
    });
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }

    const { datas, errors } = await supabase
      .from("owners")
      .insert([
        {
          email: newOwner.email,
          password: newOwner.password,
          phone_number: newOwner.phone,
        },
      ])
      .select();
    if (errors) {
      return res
        .status(400)
        .json({ message: "error connection from database" });
    }

    const { user, e } = await supabase
      .from("email_supabase")
      .insert([
        {
          email: newOwner.email,
          password: newOwner.password,
        },
      ])
      .select();
    if (e) {
      return res.status(200).json({ message: "register success" });
    }
    return res.status(200).json({ message: "register success" });
  }
}

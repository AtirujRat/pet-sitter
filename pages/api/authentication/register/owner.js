import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { id, email, password, phone } = req.body;
    if (id) {
      let { data: owners, error } = await supabase
        .from("owners")
        .select("id_provider")
        .eq("id_provider", id);
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
              id_provider: id,
              email: email,
            },
          ])
          .select();
        if (error) {
          return res
            .status(201)
            .json({ message: "User have already register" });
        }
        return res.status(200).json({ message: "register success" });
      }
      return res.status(201).json({ message: "User have already register" });
    }

    if (!email || !password || !phone) {
      return res.status(404).json({ message: "missing data from request" });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: phone,
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
          email: email,
          password: password,
          phone_number: phone,
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
          email: email,
          password: password,
        },
      ])
      .select();
    if (e) {
      return res.status(200).json({ message: "register success" });
    }
    return res.status(200).json({ message: "register success" });
  }
}

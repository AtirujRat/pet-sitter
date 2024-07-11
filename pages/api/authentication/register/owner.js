import { supabase } from "@/utils/supabase";
import bcrypt from "bcrypt";

// const getData = async (data) => {
//   try {
//     await axios.post("/api/authentication/register/owner", data);
//     console.log("success");
//   } catch (e) {
//     console.log("error");
//   }
// };

// if (localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token")) {
//   const token = localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token");
//   const data = {
//     id: token.user.id,
//     email: token.user.user_metadata.email,
//   };
//   getData(data);
// }

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newOwner = req.body;
    if (newOwner.id) {
      let { data: owners, error } = await supabase
        .from("owners")
        .select("id_provider")
        .eq("id_provider", newOwner.id);
      if (error) {
        return res.status(400).json({ name: "error connection from database" });
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
            .json({ name: "error connection from database" });
        }
        return res.status(200).json({ name: "register success" });
      }

      return res.status(201).json({ name: "User have already register" });
    }

    const salt = await bcrypt.genSalt(10);
    newOwner.password = await bcrypt.hash(newOwner.password, salt);

    if (!newOwner.email || !newOwner.password || !newOwner.phone) {
      return res.status(404).json({ message: "missing data from request" });
    }

    let { data, error } = await supabase.auth.signUp({
      email: newOwner.email,
      password: newOwner.password,
      phone: newOwner.phone,
    });
    if (error) {
      return res.status(400).json({ name: "error connection from database" });
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
      return res.status(400).json({ name: "error connection from database" });
    }
    return res.status(200).json({ name: "register success" });
  }
}

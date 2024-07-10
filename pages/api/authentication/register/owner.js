import { supabase } from "../../../utils/supabase.js";
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
//     password: token.user.user_metadata.full_name,
//     fullname: token.user.user_metadata.full_name,
//     image: token.user.user_metadata.picture,
//   };
//   getData(data);
// }

export default async function handler(req, res) {
  const newOwner = req.body;
  if (!newOwner) {
    return res.status(404).json({ message: "missing data from request" });
  }

  const salt = await bcrypt.genSalt(10);
  newOwner.password = await bcrypt.hash(newOwner.password, salt);

  if (newOwner.id) {
    const { data, error } = await supabase
      .from("owners")
      .insert([
        {
          id: newOwner.id,
          email: newOwner.email,
          password: newOwner.password,
          full_name: newOwner.fullname,
          profile_image_url: newOwner.image,
        },
      ])
      .select();
    if (errors) {
      return res.status(400).json({ name: "error connection from database" });
    }
    return res.status(200).json({ name: "register success" });
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

import { supabase } from "@/utils/supabase";
// import protect from "../protect";

export default async function handler(req, res) {
  //   protect(req, res);
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { data, error } = await supabase
        .from("sitters_bank_accounts")
        .upsert(
          [
            {
              sitter_id: id,
              bank_id: req.body.bank_id,
              account_number: req.body.account_number,
              account_name: req.body.account_name,
              book_bank_image_url: req.body.book_bank_image,
            },
          ],
          {
            onConflict: ["sitter_id"],
            ignoreDuplicates: false,
          }
        )
        .select();

      return res.status(200).json({
        data,
        message: "Banl account was updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not update bank account because database connection",
      });
    }
  } else if (req.method === "GET") {
    try {
      let { data, error } = await supabase
        .from("sitters_bank_accounts")
        .select("*")
        .eq("sitter_id", id);

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Server could not read bank account because database connection",
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

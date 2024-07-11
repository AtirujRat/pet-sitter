import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const reqBody = { ...req.body, updated_at: new Date() };

    try {
      // ตรวจสอบว่าแถวข้อมูลมีอยู่หรือไม่
      const { data: existingData, error } = await supabase
        .from("sitters")
        .select("*")
        .eq("id", id);

      if (error) {
        throw error;
      }

      if (existingData.length > 0) {
        // แถวข้อมูลมีอยู่แล้ว, ทำการอัปเดต
        const { data, error } = await supabase
          .from("sitters")
          .update({
            email: reqBody.email,
            password: reqBody.password,
            phone_number: reqBody.phone_number,
            profile_image_url: reqBody.profile_image_url,
            full_name: reqBody.full_name,
            experience: reqBody.experience,
            introduction: reqBody.introduction,
            bank_id: reqBody.bank_id,
            account_number: reqBody.account_number,
            trade_name: reqBody.trade_name,
            place_description: reqBody.place_description,
            member_status: reqBody.member_status,
            sitter_address_id: reqBody.sitter_address_id,
            updated_at: reqBody.updated_at,
            last_logged_in: reqBody.last_logged_in,
          })
          .eq("id", id)
          .select();

        if (error) {
          throw error;
        }

        res.status(200).json(data);
      } else {
        // แถวข้อมูลไม่มี, ทำการเพิ่มข้อมูล
        const { data, error } = await supabase
          .from("sitters")
          .upsert({
            id,
            email: reqBody.email,
            password: reqBody.password,
            phone_number: reqBody.phone_number,
            profile_image_url: reqBody.profile_image_url,
            full_name: reqBody.full_name,
            experience: reqBody.experience,
            introduction: reqBody.introduction,
            bank_id: reqBody.bank_id,
            account_number: reqBody.account_number,
            trade_name: reqBody.trad_ename,
            place_description: reqBody.place_description,
            member_status: reqBody.member_status,
            sitter_address_id: reqBody.sitter_address_id,
            created_at: reqBody.created_at,
            updated_at: reqBody.updated_at,
            last_logged_in: reqBody.last_logged_in,
          })
          .select();

        if (error) {
          throw error;
        }

        res.status(200).json(data);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

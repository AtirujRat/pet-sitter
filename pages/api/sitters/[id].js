import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      let { data: sitters, error } = await supabase
        .from("sitters")
        .select(
          "*, sitters_images(image_url), bookings(reviews!inner(rating, description, status, updated_at), owners(full_name, profile_image_url))"
        )
        .eq("id", id)

      if (error) {
        throw error;
      }

      return res.status(200).json({
        data: sitters,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const reqBody = { ...req.body, updated_at: new Date() };

    try {
      // ดึงข้อมูลปัจจุบันของ sitters
      const { data: existingData, error: selectError } = await supabase
        .from("sitters")
        .select("*")
        .eq("id", id);

      if (selectError) {
        throw selectError;
      }

      // เตรียมข้อมูลสำหรับการอัปเดต
      const updateData = {
        email: reqBody.email,
        phone_number: reqBody.phone_number,
        profile_image_url: reqBody.profile_image_url,
        full_name: reqBody.full_name,
        experience: reqBody.experience,
        introduction: reqBody.introduction,
        trade_name: reqBody.trade_name,
        pet_types: reqBody.pet_types,
        services: reqBody.services,
        place_description: reqBody.place_description,
        sitter_address_id: reqBody.sitter_address_id,
        updated_at: reqBody.updated_at,
        last_logged_in: reqBody.last_logged_in,
      };

      // อัปเดตข้อมูลในตาราง sitters
      let updateResult;
      if (existingData.length > 0) {
        const { data, error: updateError } = await supabase
          .from("sitters")
          .update(updateData)
          .eq("id", id)
          .select();
        if (updateError) {
          throw updateError;
        }
        updateResult = data;
      } else {
        const { data, error: upsertError } = await supabase
          .from("sitters")
          .upsert(updateData)
          .select();
        if (upsertError) {
          throw upsertError;
        }
        updateResult = data;
      }

      // อัปเดตข้อมูลในตาราง sitters_images
      const sittersImages = reqBody.sitters_images;

      // ลบข้อมูล sitters_images เก่าทั้งหมดที่เชื่อมโยงกับ sitter_id นี้
      const { error: deleteError } = await supabase
        .from("sitters_images")
        .delete()
        .eq("sitter_id", id);

      if (deleteError) {
        throw deleteError;
      }

      // เพิ่มข้อมูล sitters_images ใหม่
      const newImages = sittersImages.map((img) => ({
        sitter_id: id,
        image_url: img.image_url,
      }));

      const { data: imageData, error: imageError } = await supabase
        .from("sitters_images")
        .insert(newImages);

      if (imageError) {
        throw imageError;
      }

      res
        .status(200)
        .json({ sitters: updateResult, sitters_images: imageData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

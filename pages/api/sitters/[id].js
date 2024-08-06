import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      let { data: sitters, error } = await supabase
        .from("sitters")
        .select(
          "*, sitters_images(image_url), bookings(reviews!inner(rating, description, status, updated_at), owners(full_name, profile_image_url)), sitters_addresses(*), sitters_bank_accounts(account_number, banks(bank_name))"
        )
        .eq("id", id);

      if (!sitters || sitters.length === 0) {
        return res.status(404).json({
          message: "Server could not find the requested sitter",
        });
      }
      return res.status(200).json({
        data: sitters,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server could not read the sitter because database connection",
      });
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
        return res.status(405).json({ error: "Method Not Available" });
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
        sitter_status: "waiting for approval",
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
          return res.status(405).json({ error: "Method Not Available" });
        }
        updateResult = data;
      } else {
        const { data, error: upsertError } = await supabase
          .from("sitters")
          .upsert(updateData)
          .select();
        if (upsertError) {
          return res.status(405).json({ error: "Method Not Available" });
        }
        updateResult = data;
      }

      // ข้อมูลที่อยู่ที่ต้องการอัปเดตหรือเพิ่มใหม่
      const addressData = {
        address_detail: reqBody.sitters_addresses?.address_detail || "",
        district: reqBody.sitters_addresses?.district || "",
        sub_district: reqBody.sitters_addresses?.subDistrict || "",
        province: reqBody.sitters_addresses?.province || "",
        post_code: reqBody.sitters_addresses?.zip_code || "",
        lat: reqBody.sitters_addresses?.lat || "",
        lng: reqBody.sitters_addresses?.lng || "",
        sitter_id: id,
      };

      let addressResult;

      // ลบที่อยู่เดิมที่มี sitter_id เดียวกันออก
      const { error: deleteSitterIdError } = await supabase
        .from("sitters_addresses")
        .delete()
        .eq("sitter_id", id);

      if (deleteSitterIdError) {
        return res.status(405).json({ error: "Method Not Available" });
      }

      // แทรกที่อยู่ใหม่
      const { data, error: addressInsertError } = await supabase
        .from("sitters_addresses")
        .insert(addressData)
        .select();
      if (addressInsertError) {
        return res.status(405).json({ error: "Method Not Available" });
      }
      addressResult = data;

      // อัปเดต sitter_address_id ในตาราง sitters ให้ชี้ไปยังที่อยู่ใหม่
      const { data: updatedSitter, error: updateSitterError } = await supabase
        .from("sitters")
        .update({ sitter_address_id: addressResult[0].id })
        .eq("id", id)
        .select();
      if (updateSitterError) {
        return res.status(405).json({ error: "Method Not Available" });
      }
      updateResult = updatedSitter;

      // อัปเดตข้อมูลในตาราง sitters_images

      const { data: existingImages, error: fetchError } = await supabase
        .from("sitters_images")
        .select("image_url")
        .eq("sitter_id", id);

      const newImageUrls = reqBody.sitters_images;
      const existingImageUrls = existingImages.map((img) => img.image_url);

      const imagesToDelete = existingImageUrls.filter(
        (url) => !newImageUrls.includes(url)
      );
      for (const url of imagesToDelete) {
        const { error: deleteError } = await supabase
          .from("sitters_images")
          .delete()
          .eq("sitter_id", id)
          .eq("image_url", url);

        if (deleteError) {
          throw deleteError;
        }
      }

      const imagesToInsert = newImageUrls.filter(
        (url) => !existingImageUrls.includes(url)
      );
      if (imagesToInsert.length > 0) {
        const newImages = imagesToInsert.map((imgUrl) => ({
          sitter_id: id,
          image_url: imgUrl,
        }));

        const { error: imageError } = await supabase
          .from("sitters_images")
          .insert(newImages);

        if (imageError) {
          throw imageError;
        }
      }

      return res
        .status(200)
        .json({ sitters: updateResult, sitters_images: newImageUrls });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

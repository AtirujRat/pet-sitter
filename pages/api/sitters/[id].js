import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      let { data: sitters, error } = await supabase
        .from("sitters")
        .select("*, sitters_images(image_url), bookings(reviews!inner(rating))")
        .eq("id", id);

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

  // if (req.method === "PUT") {
  //   const { id } = req.query;
  //   const reqBody = { ...req.body, updated_at: new Date() };
  //   console.log(reqBody);

  //   const publicAttachmentUrl = supabase.storage
  //     .from("sitters/profile_image")
  //     .getPublicUrl(reqBody.fileName);

  //   console.log(publicAttachmentUrl);

  //   try {
  //     // ตรวจสอบว่าแถวข้อมูลมีอยู่หรือไม่
  //     const { data: existingData, error } = await supabase
  //       .from("sitters")
  //       .select("*", "sitters_images(image_url)")
  //       .eq("id", id);

  //     if (error) {
  //       throw error;
  //     }

  //     if (existingData.length > 0) {
  //       // แถวข้อมูลมีอยู่แล้ว, ทำการอัปเดต
  //       const { data, error } = await supabase
  //         .from("sitters", "sitters_images(image_url)")
  //         .update({
  //           email: reqBody.email,
  //           phone_number: reqBody.phone_number,
  //           profile_image_url: profileImageUrl,
  //           full_name: reqBody.full_name,
  //           experience: reqBody.experience,
  //           introduction: reqBody.introduction,
  //           trade_name: reqBody.trade_name,
  //           pet_types: reqBody.pet_types,
  //           services: reqBody.services,
  //           place_description: reqBody.place_description,
  //           sitter_address_id: reqBody.sitter_address_id,
  //           updated_at: reqBody.updated_at,
  //           last_logged_in: reqBody.last_logged_in,
  //           image_url: galleryImageUrls,
  //         })
  //         .eq("id", id)
  //         .select();

  //       if (error) {
  //         throw error;
  //       }

  //       res.status(200).json(data);
  //     } else {
  //       // แถวข้อมูลไม่มี, ทำการเพิ่มข้อมูล
  //       const { data, error } = await supabase
  //         .from("sitters", "sitters_images(image_url)")
  //         .upsert({
  //           email: reqBody.email,
  //           phone_number: reqBody.phone_number,
  //           profile_image_url: profileImageUrl,
  //           full_name: reqBody.full_name,
  //           experience: reqBody.experience,
  //           introduction: reqBody.introduction,
  //           trade_name: reqBody.trade_name,
  //           pet_types: reqBody.pet_types,
  //           services: reqBody.services,
  //           place_description: reqBody.place_description,
  //           sitter_address_id: reqBody.sitter_address_id,
  //           updated_at: reqBody.updated_at,
  //           last_logged_in: reqBody.last_logged_in,
  //           image_url: galleryImageUrls,
  //         })
  //         .select();

  //       if (error) {
  //         throw error;
  //       }

  //       res.status(200).json(data);
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // } else {
  //   return res.status(405).json({ error: "Method Not Available" });
  // }

  // const uploadImage = async (file, folder) => {
  //   const fileName = uuidv4();
  //   const { data, error } = await supabase.storage
  //     .from("sitters")
  //     .upload(`${folder}/${fileName}`, file);
  //   if (error) {
  //     console.error("Error uploading image:", error);
  //     throw error;
  //   } else {
  //     const url = supabase.storage
  //       .from("sitters")
  //       .getPublicUrl(`${folder}/${fileName}`).data.publicUrl;
  //     return url;
  //   }
  // };

  if (req.method === "PUT") {
    const { id } = req.query;
    const reqBody = { ...req.body, updated_at: new Date() };

    try {
      const { data: existingData, error: selectError } = await supabase
        .from("sitters", "sitters_images(image_url)")
        .select("*")
        .eq("id", id);

      if (selectError) {
        throw selectError;
      }

      let profileImageUrl = reqBody.profile_image_url;
      if (reqBody.profile_image_file) {
        profileImageUrl = await uploadImage(
          reqBody.profile_image_file,
          "profile_image"
        );
      }

      const galleryFiles = Array.isArray(reqBody.sitters_images)
        ? reqBody.sitters_images
        : [];
      const galleryImageUrls = [];
      for (const file of galleryFiles) {
        const url = await uploadImage(file, "gallery_images");
        galleryImageUrls.push(url);
      }

      const updateData = {
        email: reqBody.email,
        phone_number: reqBody.phone_number,
        profile_image_url: profileImageUrl,
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
        sitters_images: galleryImageUrls,
      };

      if (existingData.length > 0) {
        const { data, error: updateError } = await supabase
          .from("sitters", "sitters_images(image_url)")
          .update(updateData)
          .eq("id", id)
          .select();
        // console.log(updateError);
        if (updateError) {
          throw updateError;
        }

        res.status(200).json(data);
      } else {
        const { data, error: upsertError } = await supabase
          .from("sitters", "sitters_images(image_url)")
          .upsert(updateData)
          .select();

        // console.log(upsertError);

        if (upsertError) {
          throw upsertError;
        }

        res.status(200).json(data);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

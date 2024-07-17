import { supabase } from "@/utils/supabase";

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

  if (req.method === "PUT") {
    const { id } = req.query;
    const reqBody = { ...req.body, updated_at: new Date() };

    console.log(reqBody);
    try {
      const { data: existingData, error: selectError } = await supabase
        .from("sitters")
        .select(`*, sitters_images(image_url)`)
        .eq("id", id);

      if (selectError) {
        throw selectError;
      }

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
        sitters_images: reqBody.sitters_images.image_url,
        // sitters_images: reqBody.sitters_images.image_url
        //   ? JSON.stringify(reqBody.sitters_images.image_url)
        //   : JSON.stringify(existingData[0].sitters_images.image_url),
      };

      if (existingData.length > 0) {
        const { data, error: updateError } = await supabase
          .from("sitters")
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
          .from("sitters")
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

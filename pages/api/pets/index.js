import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const pet = req.body;
    const { data, error } = await supabase.from("pets").insert([
      {
        owner_id: pet.owner_id,
        profile_image_url: pet.profile_image_url || "",
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        sex: pet.sex,
        color: pet.color,
        weight: pet.weight,
        description: pet.description,
        status: "Available",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

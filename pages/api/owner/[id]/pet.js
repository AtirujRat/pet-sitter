import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data: pets, error } = await supabase
        .from("pets")
        .select("*")
        .eq("owner_id", id)
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      if (pets.length === 0) {
        return res
          .status(404)
          .json({ message: "No pets found for this owner" });
      }

      return res.status(200).json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error.message);
      return res.status(500).json({ message: "Error fetching pets" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        owner_id,
        pet_image_url,
        name,
        type,
        breed,
        sex,
        age,
        color,
        weight,
        description,
      } = req.body;

      if (
        !owner_id ||
        !name ||
        !type ||
        !breed ||
        !sex ||
        !age ||
        !color ||
        !weight
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: newPet, error } = await supabase.from("pets").insert([
        {
          owner_id,
          pet_image_url,
          name,
          type,
          breed,
          sex,
          age,
          color,
          weight,
          description,
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      return res
        .status(201)
        .json({ message: "Pet created successfully", newPet });
    } catch (error) {
      console.error("Error creating pet:", error.message);
      return res.status(500).json({ message: "Error creating pet" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

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
        return res.status(404).json({
          message: `Server could not find a requested pets to show for owner id ${id}`,
        });
      }

      return res.status(200).json(pets);
    } catch {
      return res.status(500).json({
        message: "Server could not read pets because database connection",
      });
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
        return res.status(400).json({
          message:
            "Server could not create pet because there are missing data from client",
        });
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

      return res.status(201).json({
        message: "Created pet successfully",
      });
    } catch {
      return res.status(500).json({
        message: "Server could not create pets because database connection",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

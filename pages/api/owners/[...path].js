import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { path } = req.query;
  const [id, petId] = path;

  if (req.method === "GET") {
    try {
      if (petId) {
        const { data: pet, error } = await supabase
          .from("pets")
          .select("*")
          .eq("owner_id", id)
          .eq("id", petId)
          .single();

        if (error) {
          throw error;
        }

        if (pet) {
          return res.status(200).json(pet);
        } else {
          return res.status(404).json({ message: "Pet not found" });
        }
      } else {
        const { data: pets, error } = await supabase
          .from("pets")
          .select("*")
          .eq("owner_id", id);

        if (error) {
          throw error;
        }

        return res.status(200).json(pets);
      }
    } catch (error) {
      console.error("Error fetching pet:", error.message);
      return res.status(500).json({ message: "Error fetching pet" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data, error } = await supabase.from("pets").insert([
        {
          owner_id: id,
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

      return res.status(201).json({ message: "Pet created successfully" });
    } catch (error) {
      console.error("Error creating pet:", error.message);
      console.log(error);
      return res.status(500).json({ message: "Error creating pet" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;
      console.log(req.body);

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: updatedPet, error } = await supabase
        .from("pets")
        .update({
          name,
          type,
          breed,
          sex,
          age,
          color,
          weight,
          description,
          updated_at: new Date(),
        })
        .eq("owner_id", id)
        .eq("id", petId)
        .single();

      if (error) {
        throw error;
      }

      return res
        .status(200)
        .json({ message: "Pet updated successfully", data: updatedPet });
    } catch (error) {
      console.error("Error updating pet:", error.message);
      return res.status(500).json({ message: "Error updating pet" });
    }
  } else if (req.method === "DELETE") {
    try {
      if (!petId) {
        return res.status(400).json({ message: "Pet ID is required" });
      }

      const { data: deletedPet, error } = await supabase
        .from("pets")
        .delete()
        .eq("owner_id", id)
        .eq("id", petId)
        .single();

      if (error) {
        throw error;
      }

      return res
        .status(200)
        .json({ message: "Pet deleted successfully", data: deletedPet });
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      return res.status(500).json({ message: "Error deleting pet" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

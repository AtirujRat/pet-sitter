import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id, petId } = req.query;

  if (req.method === "GET") {
    try {
      const { data: pet, error } = await supabase
        .from("pets")
        .select("*")
        .eq("owner_id", id)
        .eq("id", petId)
        .single();

      if (error) {
        throw error;
      }

      if (pet.length === 0) {
        return res.status(404).json({
          message: `Server could not find a requested pet id ${petId} to show for owner id ${id}`,
        });
      }

      return res.status(200).json(pet);
    } catch {
      return res.status(500).json({
        message: "Server could not read a pet because database connection",
      });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        name,
        type,
        breed,
        sex,
        age,
        color,
        weight,
        description,
        pet_image_url,
      } = req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({
          message:
            "Server could not create pet because there are missing data from client",
        });
      }

      const { data: updatedPet, error } = await supabase
        .from("pets")
        .update({
          pet_image_url,
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

      return res.status(200).json({
        message: "Updated pet successfully",
      });
    } catch {
      return res.status(500).json({
        message: "Server could not update pet because database connection",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { data: deletedPet, error } = await supabase
        .from("pets")
        .delete()
        .eq("owner_id", id)
        .eq("id", petId)
        .single();

      if (error) {
        throw error;
      }

      return res.status(200).json({
        message: "Deleted pet successfully",
      });
    } catch {
      return res.status(500).json({
        message: `Server could not delete pet id ${petId} because database connection`,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

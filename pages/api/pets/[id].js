import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const getPetsByOwner = async (ownerId) => {
        const { data, error } = await supabase
          .from("pets")
          .select("*")
          .eq("owner_id", ownerId);

        if (error) {
          throw error;
        }

<<<<<<< HEAD
        return data;
=======
        if (data && Array.isArray(data)) {
          return data;
        } else {
          return [];
        }
>>>>>>> 8ff4edd (refactor: edit update pet form)
      };

      const pets = await getPetsByOwner(id);

      if (pets.length > 0) {
        return res.status(200).json(pets);
      } else {
        return res
          .status(404)
          .json({ message: "No pets found for this owner." });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const { data, error } = await supabase
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
<<<<<<< HEAD
        .eq("id", id)
        .single();

      if (error) {
        throw error;
=======
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: error.message });
>>>>>>> 8ff4edd (refactor: edit update pet form)
      }

      return res
        .status(200)
        .json({ message: "Pet updated successfully", data });
    } catch (error) {
      console.error("Error updating pet:", error.message);
      return res.status(500).json({ error: "Error updating pet" });
    }
<<<<<<< HEAD
  } else if (req.method === "DELETE") {
    try {
      const { error } = await supabase.from("pets").delete().eq("id", id);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      return res.status(500).json({ error: "Error deleting pet" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
=======
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
>>>>>>> 8ff4edd (refactor: edit update pet form)
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

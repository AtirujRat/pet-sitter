import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id);

      if (error) {
        throw error;
      }

      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json({ message: "Pet not found" });
      }
    } catch (error) {
      console.error("Error fetching pet:", error.message);
      return res.status(500).json({ message: "Error fetching pet" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({ message: "Missing required fields" });
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
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return res
        .status(200)
        .json({ message: "Pet updated successfully", data });
    } catch (error) {
      console.error("Error updating pet:", error.message);
      return res.status(500).json({ message: "Error updating pet" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { error } = await supabase.from("pets").delete().eq("id", id);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      return res.status(500).json({ message: "Error deleting pet" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

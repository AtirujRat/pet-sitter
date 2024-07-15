import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
>>>>>>> 9dc1fd7 (refactor: update api pets)
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id);
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)
      const getPetsByOwner = async (ownerId) => {
        const { data, error } = await supabase
          .from("pets")
          .select("*")
          .eq("owner_id", ownerId);
<<<<<<< HEAD
=======
>>>>>>> 9dc1fd7 (refactor: update api pets)

      if (error) {
        throw error;
      }

      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json({ message: "Pet not found" });
      }
    } catch (error) {
<<<<<<< HEAD
      return res.status(500).json({ error: error.message });
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
      console.error("Error fetching pet:", error.message);
      return res.status(500).json({ message: "Error fetching pet" });
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
=======
>>>>>>> 9dc1fd7 (refactor: update api pets)

      if (error) {
        throw error;
      }

      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json({ message: "Pet not found" });
      }
    } catch (error) {
<<<<<<< HEAD
      return res.status(500).json({ error: error.message });
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
      console.error("Error fetching pet:", error.message);
      return res.status(500).json({ message: "Error fetching pet" });
>>>>>>> 9dc1fd7 (refactor: update api pets)
    }
  } else if (req.method === "PUT") {
    try {
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        return res.status(400).json({ message: "Missing required fields" });
=======
        return res.status(400).json({ error: "Missing required fields" });
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
        return res.status(400).json({ message: "Missing required fields" });
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
        return res.status(400).json({ error: "Missing required fields" });
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
        return res.status(400).json({ message: "Missing required fields" });
>>>>>>> 9dc1fd7 (refactor: update api pets)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        .eq("id", id)
        .single();

      if (error) {
        throw error;
=======
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: error.message });
<<<<<<< HEAD
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
        .eq("id", id)
        .single();

      if (error) {
        throw error;
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
        .eq("id", id)
        .single();

      if (error) {
        throw error;
>>>>>>> 9dc1fd7 (refactor: update api pets)
      }

      return res
        .status(200)
        .json({ message: "Pet updated successfully", data });
    } catch (error) {
      console.error("Error updating pet:", error.message);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
>>>>>>> 9dc1fd7 (refactor: update api pets)
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
<<<<<<< HEAD
<<<<<<< HEAD
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
=======
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)
      return res.status(500).json({ error: "Error updating pet" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
<<<<<<< HEAD
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
>>>>>>> 9dc1fd7 (refactor: update api pets)
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { path } = req.query;
  const [id, ...rest] = path;

  if (req.method === "GET") {
    try {
      if (rest.length > 0) {
        const petId = rest[0];

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
      const pet = req.body;

      const { data: newPet, error } = await supabase.from("pets").insert([
        {
          owner_id: id,
          profile_image_url: pet.profile_image_url || "",
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          age: pet.age,
          sex: pet.sex,
          color: pet.color,
          weight: pet.weight,
          description: pet.description,
          status: "Active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      return res
        .status(201)
        .json({ message: "Pet created successfully", data: newPet[0] });
    } catch (error) {
      console.error("Error creating pet:", error.message);
      return res.status(500).json({ message: "Error creating pet" });
    }
  } else if (req.method === "PUT") {
    try {
      const petId = rest[0];
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

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

      if (!updatedPet) {
        return res.status(404).json({ message: "Pet not found" });
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
      const petId = rest[0];

      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("owner_id", id)
        .eq("id", petId);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      return res.status(500).json({ message: "Error deleting pet" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
=======
=======
>>>>>>> 8ff4edd (refactor: edit update pet form)
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
<<<<<<< HEAD
=======
  const { path } = req.query;
  const [id, ...rest] = path;
>>>>>>> 9dc1fd7 (refactor: update api pets)

  if (req.method === "GET") {
    try {
      if (rest.length > 0) {
        const petId = rest[0];

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
      const pet = req.body;

      const { data: newPet, error } = await supabase.from("pets").insert([
        {
          owner_id: id,
          profile_image_url: pet.profile_image_url || "",
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          age: pet.age,
          sex: pet.sex,
          color: pet.color,
          weight: pet.weight,
          description: pet.description,
          status: "Active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      return res
        .status(201)
        .json({ message: "Pet created successfully", data: newPet[0] });
    } catch (error) {
      console.error("Error creating pet:", error.message);
      return res.status(500).json({ message: "Error creating pet" });
    }
  } else if (req.method === "PUT") {
    try {
      const petId = rest[0];
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

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

      if (!updatedPet) {
        return res.status(404).json({ message: "Pet not found" });
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
      const petId = rest[0];

      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("owner_id", id)
        .eq("id", petId);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      return res.status(500).json({ message: "Error deleting pet" });
    }
  } else {
<<<<<<< HEAD
    res.setHeader("Allow", ["POST"]);
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
>>>>>>> 9dc1fd7 (refactor: update api pets)
=======
=======
  const { path } = req.query;
  const [id, ...rest] = path;
>>>>>>> 9dc1fd7 (refactor: update api pets)

  if (req.method === "GET") {
    try {
      if (rest.length > 0) {
        const petId = rest[0];

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
      const pet = req.body;

      const { data: newPet, error } = await supabase.from("pets").insert([
        {
          owner_id: id,
          profile_image_url: pet.profile_image_url || "",
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          age: pet.age,
          sex: pet.sex,
          color: pet.color,
          weight: pet.weight,
          description: pet.description,
          status: "Active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      return res
        .status(201)
        .json({ message: "Pet created successfully", data: newPet[0] });
    } catch (error) {
      console.error("Error creating pet:", error.message);
      return res.status(500).json({ message: "Error creating pet" });
    }
  } else if (req.method === "PUT") {
    try {
      const petId = rest[0];
      const { name, type, breed, sex, age, color, weight, description } =
        req.body;

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

      if (!updatedPet) {
        return res.status(404).json({ message: "Pet not found" });
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
      const petId = rest[0];

      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("owner_id", id)
        .eq("id", petId);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      return res.status(500).json({ message: "Error deleting pet" });
    }
  } else {
<<<<<<< HEAD
    res.setHeader("Allow", ["POST"]);
>>>>>>> 8ff4edd (refactor: edit update pet form)
=======
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
>>>>>>> 9dc1fd7 (refactor: update api pets)
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

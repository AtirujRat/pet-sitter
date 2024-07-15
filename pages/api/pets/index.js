import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
<<<<<<< HEAD
  if (req.method === "GET") {
    try {
      const { data: pets, error: fetchError } = await supabase
        .from("pets")
        .select("*");

      if (fetchError) {
        throw new Error("Error fetching pets from the database");
      }

      return res.status(200).json({ pets });
    } catch (error) {
      console.error("Error fetching pets:", error);
      return res.status(500).json({ message: "Failed to fetch pets" });
    }
  } else if (req.method === "POST") {
    try {
      const newPet = req.body;

      if (!newPet.owner_id) {
        return res.status(400).json({ message: "Owner ID is required" });
      }

      const { data: insertedPet, error: insertError } = await supabase
        .from("pets")
        .insert({
          owner_id: newPet.owner_id,
          name: newPet.petName,
          pet_type: newPet.petType,
          breed: newPet.breed,
          age: newPet.age,
          gender: newPet.sex,
          color: newPet.color,
          weight: newPet.weight,
          description: newPet.about,
        });

      if (insertError) {
        throw new Error("Error inserting pet into the database");
      }

      return res
        .status(200)
        .json({ message: "Pet created successfully", pet: insertedPet[0] });
    } catch (error) {
      console.error("Error creating pet:", error);
      return res.status(500).json({ message: "Failed to create pet" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, ...updatedPet } = req.body;
      const { ownerId, petId } = updatedPet; // Assuming these are passed in the body

      const { data, error } = await supabase
        .from("pets")
        .update(updatedPet)
        .eq("owner_id", ownerId)
        .eq("id", petId);

      if (error) {
        throw error;
      }

      return res
        .status(200)
        .json({ message: "Pet updated successfully", data });
    } catch (error) {
      console.error("Error updating pet:", error);
      return res.status(500).json({ message: "Failed to update pet" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const { error: deleteError } = await supabase
        .from("pets")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error("Error deleting pet from the database");
      }

      return res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error("Error deleting pet:", error);
      return res.status(500).json({ message: "Failed to delete pet" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
=======
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
>>>>>>> 8ff4edd (refactor: edit update pet form)
  }
}

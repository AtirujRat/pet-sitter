import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
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
<<<<<<< HEAD
<<<<<<< HEAD
      const { data, error } = await supabase
        .from("pets")
        .update(values)
        .eq("owner_id", ownerId)
        .eq("id", petId);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: "Pet updated successfully", data });
    } catch (error) {
      console.error("Error updating pet:", error);
      res.status(500).json({ message: "Error updating pet", error });
=======
      const { id, ...updatedPet } = req.body;

      const { data: updatedData, error: updateError } = await supabase
=======
      const { data, error } = await supabase
>>>>>>> 6fecf16 (feat: create api update pet)
        .from("pets")
        .update(values)
        .eq("owner_id", ownerId)
        .eq("id", petId);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: "Pet updated successfully", data });
    } catch (error) {
      console.error("Error updating pet:", error);
<<<<<<< HEAD
      return res.status(500).json({ message: "Failed to update pet" });
>>>>>>> ef81c68 (feat: create pet)
=======
      res.status(500).json({ message: "Error updating pet", error });
>>>>>>> 6fecf16 (feat: create api update pet)
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
  }
}

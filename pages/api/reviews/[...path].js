import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { path } = req.query;
  const [Id, reviewId] = path;

  if (req.method === "GET") {
    try {
      if (reviewsId) {
        const { data: reviews, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("id", id);

        if (error) {
          throw error;
        }

        if (reviews) {
          return res.status(200).json(reviews);
        } else {
          return res.status(404).json({ message: "reviews not found" });
        }
      } else {
        const { data: reviews, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("owner_id", id);

        if (error) {
          throw error;
        }

        return res.status(200).json(reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
      return res.status(500).json({ message: "Error fetching review" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        owner_id,
        reviews_image_url,
        name,
        type,
        breed,
        sex,
        age,
        color,
        weight,
        description,
      } = req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: newreviews, error } = await supabase
        .from("reviews")
        .insert([
          {
            owner_id,
            reviews_image_url,
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

      return res.status(201).json({ message: "reviews created successfully" });
    } catch (error) {
      console.error("Error creating reviews:", error.message);
      return res.status(500).json({ message: "Error creating reviews" });
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
        reviews_image_url,
      } = req.body;

      if (!name || !type || !breed || !sex || !age || !color || !weight) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: updatedreviews, error } = await supabase
        .from("reviews")
        .update({
          reviews_image_url,
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
        .eq("id", reviewsId)
        .single();

      if (error) {
        throw error;
      }
      return res.status(200).json({ message: "reviews updated successfully" });
    } catch (error) {
      console.error("Error updating reviews:", error.message);
      return res.status(500).json({ message: "Error updating reviews" });
    }
  } else if (req.method === "DELETE") {
    try {
      if (!reviewsId) {
        return res.status(400).json({ message: "reviews ID is required" });
      }

      const { data: deletedreviews, error } = await supabase
        .from("reviews")
        .delete()
        .eq("owner_id", id)
        .eq("id", reviewsId)
        .single();

      if (error) {
        throw error;
      }

      return res.status(200).json({
        message: "reviews deleted successfully",
        data: deletedreviews,
      });
    } catch (error) {
      console.error("Error deleting reviews:", error.message);
      return res.status(500).json({ message: "Error deleting reviews" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

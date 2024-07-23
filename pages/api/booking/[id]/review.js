import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data: review, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("booking_id", id);

      if (error) {
        throw error;
      }

      if (review.length === 0) {
        return res
          .status(404)
          .json({ message: "No review found for this booking" });
      }

      return res.status(200).json(review);
    } catch {
      return res.status(500).json({ message: "Error fetching review" });
    }
  } else if (req.method === "POST") {
    try {
      const { rating, description } = req.body;

      if (!rating) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: newReview, error } = await supabase.from("reviews").insert([
        {
          booking_id: id,
          rating,
          description,
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (error) {
        throw error;
      }

      return res.status(201).json({ message: "Review created successfully" });
    } catch {
      return res.status(500).json({ message: "Error creating Review" });
    }
  } else if (req.method === "PUT") {
    try {
      const { rating, status, description } = req.body;
      const updateData = {};

      if (!rating && !status && !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (rating !== undefined) updateData.rating = rating;
      if (status !== undefined) updateData.status = status;
      if (description !== undefined) updateData.description = description;
      updateData.updated_at = new Date();

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      const { data: updatedReview, error } = await supabase
        .from("reviews")
        .update(updateData)
        .eq("booking_id", id);

      if (error) {
        console.error("Error updating review:", error);
        throw error;
      }

      return res.status(200).json({ message: "Review updated successfully" });
    } catch {
      return res.status(500).json({ message: "Error updating review" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { data: deletedReview, error } = await supabase
        .from("reviews")
        .delete()
        .eq("booking_id", id);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: "Review deleted successfully" });
    } catch {
      return res.status(500).json({ message: "Error deleting review" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

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
        return res.status(404).json({
          message: `Server could not find a requested review to show for owner id ${id}`,
        });
      }

      return res.status(200).json(review);
    } catch {
      return res.status(500).json({
        message: "Server could not read review because database connection",
      });
    }
  } else if (req.method === "POST") {
    try {
      const { rating, description } = req.body;

      if (!rating) {
        return res.status(400).json({
          message: `Server could not create review for booking id ${id} because there are missing data from client`,
        });
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

      if (!newReview || newReview === 0) {
        return res.status(404).json({
          message: `Server could not find a requested booking id ${id} to create review`,
        });
      }

      return res
        .status(201)
        .json({ message: `Created review for booking id ${id} successfully` });
    } catch {
      return res.status(500).json({
        message: "Server could not create review because database connection",
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { rating, status, description } = req.body;
      const updateData = {};

      if (
        rating === undefined &&
        status === undefined &&
        description === undefined
      ) {
        return res.status(400).json({
          message:
            "Server could not update review because there are missing data from client",
        });
      }

      if (rating !== undefined) updateData.rating = rating;
      if (status !== undefined) updateData.status = status;
      if (description !== undefined) updateData.description = description;
      updateData.updated_at = new Date();

      const { data: updatedReview, error } = await supabase
        .from("reviews")
        .update(updateData)
        .eq("booking_id", id);

      if (error) {
        throw error;
      }

      if (!updatedReview || updatedReview.length === 0) {
        return res.status(404).json({
          message: `Server could not find a requested review for booking id ${id} to update`,
        });
      }

      return res.status(200).json(updatedReview);
    } catch {
      return res.status(500).json({
        message: "Server could not update review because database connection",
      });
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

      if (!deletedReview || deletedReview.length === 0) {
        return res.status(404).json({
          message: `Server could not find a requested review for booking id ${id} to delete`,
        });
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

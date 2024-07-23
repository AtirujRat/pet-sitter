import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  const { bookingId, reviewId } = req.query;

  if (req.method === "GET") {
    try {
      if (reviewId) {
        const { data: review, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("booking_id", bookingId)
          .eq("id", reviewId)
          .single();

        if (error) {
          throw error;
        }

        if (review) {
          return res.status(200).json(review);
        } else {
          return res.status(404).json({ message: "Review not found" });
        }
      } else {
        const { data: reviews, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("booking_id", bookingId)
          .order("id", { ascending: true });

        if (error) {
          throw error;
        }

        return res.status(200).json(reviews);
      }
    } catch (error) {
      console.error("Error fetching review:", error.message);
      return res.status(500).json({ message: "Error fetching review" });
    }
  } else if (req.method === "POST") {
    try {
      const { booking_id, rating, description } = req.body;

      if (!booking_id || !rating || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: newReview, error } = await supabase.from("reviews").insert([
        {
          booking_id,
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

      return res
        .status(201)
        .json({ message: "Review created successfully", newReview });
    } catch (error) {
      console.error("Error creating review:", error.message);
      return res.status(500).json({ message: "Error creating review" });
    }
  } else if (req.method === "PUT") {
    try {
      const { rating, description, status } = req.body;

      if (!rating || !description || !status) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { data: updatedReview, error } = await supabase
        .from("reviews")
        .update({
          rating,
          description,
          status,
          updated_at: new Date(),
        })
        .eq("booking_id", bookingId)
        .eq("id", reviewId)
        .single();

      if (error) {
        throw error;
      }
      return res
        .status(200)
        .json({ message: "Review updated successfully", updatedReview });
    } catch (error) {
      console.error("Error updating review:", error.message);
      return res.status(500).json({ message: "Error updating review" });
    }
  } else if (req.method === "DELETE") {
    try {
      if (!reviewId) {
        return res.status(400).json({ message: "Review ID is required" });
      }

      const { data: deletedReview, error } = await supabase
        .from("reviews")
        .delete()
        .eq("booking_id", bookingId)
        .eq("id", reviewId)
        .single();

      if (error) {
        throw error;
      }

      return res
        .status(200)
        .json({ message: "Review deleted successfully", deletedReview });
    } catch (error) {
      console.error("Error deleting review:", error.message);
      return res.status(500).json({ message: "Error deleting review" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

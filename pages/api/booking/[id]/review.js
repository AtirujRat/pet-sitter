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
        console.error("Error inserting review:", error);
        throw error;
      }

      return res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
      console.error("Error creating Review:", error);
      return res.status(500).json({ message: "Error creating Review" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

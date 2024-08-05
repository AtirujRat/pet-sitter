import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const { reviewId, newStatus } = req.body;

      if (!reviewId || !newStatus) {
        return res.status(400).json({
          message: "Review ID and new status are required.",
        });
      }

      const { data, error } = await supabase
        .from("reviews")
        .update({ status: newStatus })
        .eq("id", reviewId)
        .select();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Server could not find a review to update",
        });
      }

      return res.status(200).json({
        message: "Review status updated successfully.",
        data,
      });
    } catch (error) {
      console.error("Error in API handler:", error);
      return res.status(500).json({
        message:
          "Server could not update review status because of a database connection issue.",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Available" });
  }
}

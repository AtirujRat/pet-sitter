import connectionPool from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data =
        await connectionPool.query(`select sitters.id  ,sitters.profile_image_url,bookings.owner_id 
            ,sitters.full_name , 
            reviews.rating ,reviews.created_at ,
            reviews.description from bookings
              inner join reviews
              on bookings.id = reviews.booking_id
              inner join sitters
              on bookings.sitter_id = sitters.id`);

      return res.status(200).json(data.rows);
    } catch {
      return res.status(500).json({ message: "Error" });
    }
  }
}

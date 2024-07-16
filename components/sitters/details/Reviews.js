import RatingFilter from "./RatingFilter";
import ReviewRating from "@/components/sitters/ReviewRating";

export default function Reviews(props) {

  return (
    <div className="reviews-container w-full h-fit bg-[#f6f6f9] rounded-tl-[120px] rounded-bl-2xl rounded-r-2xl flex flex-col gap-4 p-6">
      <div className="reviews-bar w-full min-w-[590px] h-fit bg-ps-white rounded-r-xl rounded-l-[99px] p-6 gap-10 flex">
        <div className="bg-ps-black w-[146px] h-[146px] min-w-[146px] max-h-[146px] rounded-full rounded-br-none flex flex-col justify-center items-center">
          <h2 className="text-h2 text-ps-white">4.5</h2>
          <p className="text-b3 text-ps-white">27 Reviews</p>
        </div>
        <div className="rating-filter flex flex-col gap-4">
          <h3 className="text-h3">Rating & Reviews</h3>
          <RatingFilter />
        </div>
      </div>
      {/* รอสร้าง Map */}
      <div className="review w-full h-fit flex gap-4 px-6 pt-6 pb-10 border-b border-b-ps-gray-200">
        <div className="reviewer-profile flex gap-4 w-[220px]">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src="https://placedog.net/200x100?r"
          ></img>
          <div className="reviewer-name">
            <p className="text-b1">Emily B.</p>
            <p className="text-b3 text-ps-gray-400">Aug 16, 2023</p>
          </div>
        </div>
        <div className="review-content w-full flex flex-col gap-4">
          <ReviewRating ratingStars={5} />
          <p className="text-b2 text-ps-gray-500">I recently had the pleasure of entrusting Jane Maison with the care of my two energetic Labrador Retrievers, Max and Bella, while I was away on a business trip. I can confidently say that Jane exceeded all my expectations as a pet sitter.</p>
        </div>
      </div>
      <div className="review w-full h-fit flex gap-4 px-6 pt-6 pb-10 border-b border-b-ps-gray-200">
        <div className="reviewer-profile flex gap-4 w-[220px]">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src="https://placedog.net/200x100?r"
          ></img>
          <div className="reviewer-name">
            <p className="text-b1">David M.</p>
            <p className="text-b3 text-ps-gray-400">Aug 16, 2023</p>
          </div>
        </div>
        <div className="review-content w-full flex flex-col gap-4">
          <ReviewRating ratingStars={3} />
          <p className="text-b2 text-ps-gray-500">I cannot express how grateful I am to have found Jane Maison as a pet sitter for my cat, Whiskers. Jane took the time to understand Whiskers' routines, likes, and quirks. During my recent vacation, she provided regular updates, including photos of Whiskers playing, lounging, and even eating his favorite treats. It was evident that Whiskers was not only well-cared for but was also enjoying his time with Jane.</p>
        </div>
      </div>
    </div>
  );
}

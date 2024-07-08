export default function RatingStars() {
  const rate = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="flex gap-2">
        {rate.reverse().map((x, index) => (
          <button
            key={index}
            className="flex px-2 py-1 items-center justify-center gap-1 border border-[#DCDFED] rounded-lg"
          >
            <p className="text-b2 text-ps-gray-400">{x}</p>
            {Array.from({ length: x }).map((rate, index2) => (
              <img
                src="/assets/star-rating.svg"
                alt="Star Rating"
                key={index2}
              />
            ))}
          </button>
        ))}
      </div>
    </>
  );
}

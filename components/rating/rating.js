export default function Rating() {
  const rate = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {rate.reverse().map((x, index) => (
          <button
            key={index}
            id={x}
            role="checkbox"
            className="flex px-2 py-1 items-center justify-center gap-1 border border-[#DCDFED] focus:border-ps-orange-500 rounded-lg text-b2 text-ps-gray-400 focus:text-ps-orange-500"
          >
            {x}
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

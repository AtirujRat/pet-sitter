import arrow_icon from "@/public/assets/icons/icon-next.svg";
import Image from "next/image";

export default function Pagination({
  values,
  valuePerPage,
  currentPage,
  setCurrentPage,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(values.length / valuePerPage); i++) {
    pages.push(i);
  }

  function nextPageHandle() {
    if (currentPage === pages.length) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  }
  function previousPageHandle() {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  }

  return (
    <div className="flex items-center justify-center mt-[20px] gap-6">
      <Image
        onClick={previousPageHandle}
        className="cursor-pointer rotate-180"
        src={arrow_icon}
        alt="arrow icon"
      />
      <div className="flex gap-[12px]">
        {pages.map((page, index) => {
          return (
            <button
              onClick={() => setCurrentPage(page)}
              className={`w-[40px] h-[40px] ${
                index + 1 === currentPage
                  ? "bg-ps-orange-100 text-ps-orange-500"
                  : "bg-ps-white text-ps-gray-300"
              }   rounded-full text-[16px] font-[700]`}
              key={index}
            >
              {page}
            </button>
          );
        })}
      </div>
      <Image
        onClick={nextPageHandle}
        className="cursor-pointer"
        src={arrow_icon}
        alt="arrow icon"
      />
    </div>
  );
}

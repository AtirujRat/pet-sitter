import Image from "next/image";
import previous from "/public/assets/icons/icon-previous.svg";
import next from "/public/assets/icons/icon-next.svg";
import { useSitters } from "@/context/SittersProvider";

export default function Pagination() {
  const { selectMap, currentPage, setCurrentPage, totalPages } = useSitters();

  return (
    <>
      {selectMap === "list" && (
        <div className="pagination max-lg:hidden flex h-10 gap-3 w-fit">
          {currentPage > 1 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              className="previous h-10 w-10 flex justify-center items-center"
            >
              <Image src={previous} alt="previous page" />
            </button>
          )}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            if (pageNumber === currentPage) {
              return (
                <button
                  key={pageNumber}
                  value={pageNumber}
                  className="next h-10 w-10 flex justify-center items-center font-bold text-ps-orange-500 bg-ps-orange-100 rounded-full"
                >
                  {pageNumber}
                </button>
              );
            } else {
              return (
                <button
                  key={pageNumber}
                  value={pageNumber}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                  }}
                  className="next h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white  rounded-full"
                >
                  {pageNumber}
                </button>
              );
            }
          })}
          {currentPage < totalPages && (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              className="next h-10 w-10 flex justify-center items-center"
            >
              <Image src={next} alt="next page" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

import Image from "next/image";
import previous from "/public/assets/icons/icon-previous.svg";
import next from "/public/assets/icons/icon-next.svg";
import { useSitters } from "@/context/SittersProvider";

export default function SitterPagination() {
  const { selectMap, currentPage, setCurrentPage, totalPages } = useSitters();

  function renderPaginationButtons() {
    const buttons = [];

    function addButton(pageNumber, isCurrent = false) {
      buttons.push(
        <button
          key={pageNumber}
          value={pageNumber}
          onClick={() => !isCurrent && setCurrentPage(pageNumber)}
          className={`h-10 w-10 flex justify-center items-center font-bold rounded-full ${
            isCurrent
              ? "text-ps-orange-500 bg-ps-orange-100"
              : "text-ps-gray-300 bg-ps-white"
          }`}
        >
          {pageNumber}
        </button>
      );
    }

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        addButton(i, i === currentPage);
      }
    } else {
      addButton(1, currentPage === 1);

      if (currentPage > 3) {
        buttons.push(
          <span
            key="left-dots"
            className="h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white rounded-full"
          >
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        addButton(i, i === currentPage);
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span
            key="right-dots"
            className="h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white rounded-full"
          >
            ...
          </span>
        );
      }

      addButton(totalPages, currentPage === totalPages);
    }
    
    return buttons;
  }

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
          {renderPaginationButtons()}
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

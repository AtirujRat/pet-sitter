import Image from "next/image";
import previous from "/public/assets/icon-previous.svg";
import next from "/public/assets/icon-next.svg";


export default function Pagination() {
  return (
    <div className="pagination max-lg:hidden flex h-10 gap-3 w-fit">
      <button className="next h-10 w-10 flex justify-center items-center">
        <Image src={previous} alt="previous page" />
      </button>
      <button className="next h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white active:text-ps-orange-500 active:bg-ps-orange-100 rounded-full">
        1
      </button>
      <button className="next h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white active:text-ps-orange-500 active:bg-ps-orange-100 rounded-full">
        2
      </button>
      <button className="next h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white active:text-ps-orange-500 active:bg-ps-orange-100 rounded-full">
        3
      </button>
      <button className="next h-10 w-10 flex justify-center items-center font-bold text-ps-gray-300 bg-ps-white active:text-ps-orange-500 active:bg-ps-orange-100 rounded-full">
        4
      </button>
      <button className="next h-10 w-10 flex justify-center items-center">
        <Image src={next} alt="next page" />
      </button>
    </div>
  );
}

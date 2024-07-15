import Image from "next/image";
import listActive from "/public/assets/sitters/icon-list-active.svg";
import mapInactive from "/public/assets/sitters/icon-map-inactive.svg";

export default function PageTitleDesktop() {
  return (
    <div className="title-container max-lg:hidden flex justify-between w-full my-10">
      <div className="text-h3 text-ps-gray-600">Search For Pet Sitter</div>
      <div className="view-type flex gap-2.5 ">
        <button
          className={`border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex text-ps-orange-500 text-base max-lg:w-full`}
        >
          <Image src={listActive} width={20} height={20} alt="list-view" />
          List
        </button>
        <button
          className={`border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex  text-ps-gray-300 text-base max-lg:w-full`}
        >
          <Image src={mapInactive} width={20} height={20} alt="map-view" />
          Map
        </button>
      </div>
    </div>
  );
}

import Image from "next/image";
import listActive from "/public/assets/icons/icon-list-active.svg";
import listInactive from "/public/assets/icons/icon-list-inactive.svg";
import mapInactive from "/public/assets/icons/icon-map-inactive.svg";
import mapActive from "/public/assets/icons/icon-map-active.svg";
import { useSitters } from "@/context/SittersProvider";

export default function PageTitleMobile() {
  const { selectMap, setSelectMap } = useSitters();
  return (
    <div className="title-container lg:hidden flex-col flex items-center max-sm:px-5">
      <div className="text-h4 w-fit text-ps-gray-600 mb-3">
        Search For Pet Sitter
      </div>
      <div className="view-type flex gap-2.5 w-full">
        <button
          type="button"
          onClick={() => {
            setSelectMap("list");
          }}
          className={
            selectMap === "list"
              ? `border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex text-ps-orange-500 text-base max-lg:w-full`
              : `border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex  text-ps-gray-300 text-base max-lg:w-full`
          }
        >
          {selectMap === "list" ? (
            <Image src={listActive} width={20} height={20} alt="list-view" />
          ) : (
            <Image src={listInactive} width={20} height={20} alt="list-view" />
          )}
          List
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectMap("map");
          }}
          className={
            selectMap === "map"
              ? `border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex text-ps-orange-500 text-base max-lg:w-full`
              : `border-[1px] rounded-lg px-3 py-2 gap-2 justify-center items-center flex  text-ps-gray-300 text-base max-lg:w-full`
          }
        >
          {selectMap === "map" ? (
            <Image src={mapActive} width={20} height={20} alt="map-view" />
          ) : (
            <Image src={mapInactive} width={20} height={20} alt="list-view" />
          )}
          Map
        </button>
      </div>
    </div>
  );
}

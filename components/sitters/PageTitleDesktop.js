import Image from "next/image";
import listActive from "/public/assets/icons/icon-list-active.svg";
import listInactive from "/public/assets/icons/icon-list-inactive.svg";
import mapInactive from "/public/assets/icons/icon-map-inactive.svg";
import mapActive from "/public/assets/icons/icon-map-active.svg";
import { useSitters } from "@/context/SittersProvider";

export default function PageTitleDesktop() {
  const { selectMap, setSelectMap } = useSitters();
  return (
    <div className="title-container max-lg:hidden flex justify-between w-full my-10">
      <div className="text-h3 text-ps-gray-600">Search For Pet Sitter</div>
      <div className="view-type flex gap-2.5 ">
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

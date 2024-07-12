import SittersList from "@/components/sitters/SittersList";
import ViewTypeButton from "@/components/sitters/ViewTypeButton";
import SearchBarSitter from "@/components/sitters/SearchBarSitter";
import listInactive from "/public/assets/sitters/icon-list-inactive.svg";
import mapInactive from "/public/assets/sitters/icon-map-inactive.svg";
import goUp from "/public/assets/sitters/icon-up.svg";
import Image from "next/image";
import Pagination from "@/components/Pagination";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/sitters");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Sitters({ data }) {
  const sitters = data.data;
  return (
    <section className="w-full flex justify-center bg-ps-gray-100 sm:py-8 pt-4 lg:pb-32">
      <div className="page-container w-full sm:px-20 max-w-[1440px] flex flex-col items-center">
        {/* Desktop: Search Title */}
        <div className="title-container max-lg:hidden flex justify-between w-full my-10">
          <div className="text-h3 text-ps-gray-600">Search For Pet Sitter</div>
          <div className="view-type flex gap-2.5 ">
            <ViewTypeButton type="List" src={listInactive} alt="list-view" />
            <ViewTypeButton type="Map" src={mapInactive} alt="map-view" />
          </div>
        </div>
        <div className="content-container flex gap-8 max-lg:flex-col lg:mb-11">
          <SearchBarSitter />
          {/* Mobile: Search Title */}
          <div className="title-container lg:hidden flex-col flex items-center max-sm:px-5">
            <div className="text-h4 w-fit text-ps-gray-600 mb-3">
              Search For Pet Sitter
            </div>
            <div className="view-type flex gap-2.5 w-full">
              <ViewTypeButton type="List" src={listInactive} alt="list-view" />
              <ViewTypeButton type="Map" src={mapInactive} alt="map-view" />
            </div>
          </div>
          <SittersList sitters={sitters} />
          <button
            className="lg:hidden rounded-full px-3 py-3 bg-ps-orange-100 justify-center items-center flex w-16 h-16 self-end max-sm:mx-5 relative -top-14"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <Image src={goUp} width={24} height={24} alt="Go up" />
          </button>
        </div>
        <Pagination />
      </div>
    </section>
  );
}

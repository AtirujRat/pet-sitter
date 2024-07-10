import SittersList from "@/components/sitters/SittersList";
import PetTypeBadge from "@/components/sitters/PetTypeBadge";
import ViewTypeButton from "@/components/sitters/ViewTypeButton";
import SearchBarSitter from "@/components/sitters/SearchBarSitter";

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
    <section className="w-full flex justify-center bg-[#FAFAFB] py-8 pb-32">
      <div className="page-container w-full px-20 max-w-[1440px]">
        <div className="title-container flex justify-between my-10">
          <div className="text-h3 text-ps-gray-600">Search For Pet Sitter</div>
          <div className="view-type flex gap-2.5 ">
            <ViewTypeButton
              type="List"
              src="/assets/sitters/icon-list-inactive.svg"
              alt="list-view"
            />
            <ViewTypeButton
              type="Map"
              src="/assets/sitters/icon-map-inactive.svg"
              alt="map-view"
            />
          </div>
        </div>
        <div className="content-container flex gap-6 ">
          <div className="search-box flex-1 bg-ps-white w-[30%] h-fit rounded-2xl shadow-lg p-6">
            <SearchBarSitter />
          </div>
          <SittersList sitters={sitters} />
        </div>
      </div>
    </section>
  );
}

// import HeaderHomes from "@/components/home/HeaderHome";
// import ContentHomePage from "@/components/home/ContentHomePage";
// import FindAPetSister from "@/components/home/FindAPetSister";
import PlaceSearch from "@/components/PlaceSearch";
import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="flex">
      <div>
        <PlaceSearch />
      </div>
      <Map />
    </div>
    // <section className="w-full flex-col items-center lg:pt-20 pt-10 overflow-hidden ">
    //   <HeaderHomes />
    //   <ContentHomePage />
    //   <FindAPetSister />
    // </section>
  );
}

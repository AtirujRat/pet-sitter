// import HeaderHomes from "@/components/home/HeaderHome";
// import ContentHomePage from "@/components/home/ContentHomePage";
// import FindAPetSister from "@/components/home/FindAPetSister";
import AddressForm from "@/components/AddressForm";

export default function Home() {
  return (
    <div className="flex">
      <div>
        <AddressForm />
      </div>
    </div>
    // <section className="w-full flex-col items-center lg:pt-20 pt-10 overflow-hidden ">
    //   <HeaderHomes />
    //   <ContentHomePage />
    //   <FindAPetSister />
    // </section>
  );
}

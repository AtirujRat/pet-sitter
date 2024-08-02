import Map from "@/components/map/Map";

export default function SitterDescriptions({ sitter }) {
  return (
    <div className="sitter-details w-full flex flex-col sm:gap-12 gap-6 sm:py-6 sm:px-20 px-4 max-sm:pb-10">
      <h1 className="trade-name sm:text-h1 text-h2">{sitter.trade_name}</h1>
      <div className="introduction flex flex-col gap-3">
        <h3 className="sm:text-h3 text-h4">Introduction</h3>
        <p className="sm:text-b2 text-b3 text-ps-gray-500 whitespace-pre-line">
          {sitter.introduction}
        </p>
      </div>
      <div className="service flex flex-col gap-3">
        <h3 className="sm:text-h3 text-h4">Services</h3>
        <p className="sm:text-b2 text-b3 text-ps-gray-500 whitespace-pre-line">
          {sitter.services}
        </p>
      </div>
      <div className="my-place flex flex-col gap-3">
        <h3 className="sm:text-h3 text-h4">My Place</h3>
        <p className="sm:text-b2 text-b3 text-ps-gray-500 whitespace-pre-line">
          {sitter.place_description}
        </p>
        <div className="map w-full h-[220px] rounded-lg mt-4 object-center">
          <Map draggable={false} />
        </div>
      </div>
    </div>
  );
}

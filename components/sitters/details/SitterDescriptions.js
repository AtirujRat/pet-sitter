export default function SitterDescriptions({ sitter }) {
  return (
    <div className="sitter-details w-full flex flex-col gap-12 py-6 px-20 ">
      <h1 className="trade-name text-h1">{sitter.trade_name}</h1>
      <div className="introduction flex flex-col gap-3">
        <h3 className="text-h3">Introduction</h3>
        <p className="text-b2 text-ps-gray-500 whitespace-pre-line">
          {sitter.introduction}
        </p>
      </div>
      <div className="service flex flex-col gap-3">
        <h3 className="text-h3">Services</h3>
        <p className="text-b2 text-ps-gray-500 whitespace-pre-line">
          {sitter.services}
        </p>
      </div>
      <div className="my-place flex flex-col gap-3">
        <h3 className="text-h3">My Place</h3>
        <p className="text-b2 text-ps-gray-500 whitespace-pre-line">
          {sitter.place_description}
        </p>
      </div>
    </div>
  );
}

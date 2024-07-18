export default function BookingDetail() {
  return (
    <section className="max-lg:hidden w-[30%] h-fit flex flex-col border-none rounded-2xl shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)]">
      <h3 className="p-6 border-b-[1px] text-h3 text-ps-gray-600 border-ps-gray-200">
        Booking Detail
      </h3>
      <div className="p-6 flex flex-col gap-6">
        <div>
          <p className="text-b3 text-ps-gray-400">Pet sitter:</p>
          <p className="text-b2 text-ps-gray-600">
            Happy House! By Jane Maison
          </p>
        </div>

        <div>
          <p className="text-b3 text-ps-gray-400">Date & Time:</p>
          <p className="text-b2 text-ps-gray-600">
            25 Aug, 2023 <span className="text-ps-gray-400">|</span> 7 AM - 10
            AM
          </p>
        </div>

        <div>
          <p className="text-b3 text-ps-gray-400">Duration:</p>
          <p className="text-b2 text-ps-gray-600">3 hours</p>
        </div>

        <div>
          <p className="text-b3 text-ps-gray-400">Pet:</p>
          <p className="text-b2 text-ps-gray-600">-</p>
        </div>
      </div>
      <div className="p-6 bg-ps-black border-none rounded-b-2xl flex justify-between">
        <p className="text-b2 text-ps-white">Total</p>
        <p className="text-b1 text-ps-white">600.00 THB</p>
      </div>
    </section>
  );
}
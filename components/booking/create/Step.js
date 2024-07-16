export default function Step() {
  return (
    <div className="p-6 w-full flex justify-center gap-16 shadow-[4px_4px_24px_0_rgba(0,0,0,0.04)]">
      <div className="flex gap-3 items-center">
        <h3 className="w-12 h-12 py-3 text-h3 text-ps-white border-none rounded-full bg-ps-orange-500 flex justify-center items-center">
          1
        </h3>
        <p className="text-b1 text-ps-orange-500">Your pet</p>
      </div>

      <div className="flex gap-3 items-center">
        <h3 className="w-12 h-12 py-3 text-h3 text-ps-gray-400 border-none rounded-full bg-ps-gray-100 flex justify-center items-center">
          2
        </h3>
        <p className="text-b1 text-ps-gray-400">Infomation</p>
      </div>

      <div className="flex gap-3 items-center">
        <h3 className="w-12 h-12 py-3 text-h3 text-ps-gray-400 border-none rounded-full bg-ps-gray-100 flex justify-center items-center">
          3
        </h3>
        <p className="text-b1 text-ps-gray-400">Payment</p>
      </div>
    </div>
  );
}

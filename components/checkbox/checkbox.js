export default function Checkbox() {
  return (
    <div className="bg-ps-gray-200 px-6 gap-[26px] w-full h-[72px] flex items-center space-x-4 text-ps-gray-600 rounded-t-3xl">
      <p className="text-ps-gray-600 font-bold">Pet Type:</p>
      <span className="form-control ">
        <label className="cursor-pointer label flex items-center space-x-4 bg-ps-gray-200">
          <input
            type="checkbox"
            className="checkbox checkbox-warning border border-ps-gray-300"
          />
          <span className="label-text text-[16px] font-medium">Dog</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning border border-ps-gray-300"
          />
          <span className="label-text text-[16px] font-medium">Cat</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning border border-ps-gray-300"
          />
          <span className="label-text text-[16px] font-medium">Bird</span>
          <input
            type="checkbox"
            className="checkbox checkbox-warning border border-ps-gray-300"
          />
          <span className="label-text text-[16px] font-medium">Rabbit</span>
        </label>
      </span>
    </div>
  );
}

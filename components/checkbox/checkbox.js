export default function Checkbox() {
  return (
    <div className="w-full sm:flex sm:items-center sm:h-[72px]">
      <div className="text-ps-gray-600 font-bold pt-4 pb-2 pr-3 sm:pt-0 sm:pb-0">
        Pet Type:
      </div>
      <span className="form-control w-full max-w-[328px]">
        <label className="cursor-pointer label sm:space-x-3 bg-ps-gray-200">
          <input
            type="checkbox"
            className="checkbox checkbox-warning border border-ps-gray-300 "
          />
          <span className="label-text text-[16px] font-medium ">Dog</span>
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

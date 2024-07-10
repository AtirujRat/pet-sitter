export default function Checkbox() {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center">
      <span className="form-control w-full max-w-[328px]">
        <label className="cursor-pointer label sm:space-x-3">
          <input
            type="checkbox"
            className="checkbox checkbox-warning border border-ps-gray-300 "
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

const SearchBar = () => {
  return (
    <div className="w-full max-w-[1064px]">
      <div className="bg-ps-gray-200 px-6 gap-[26px] w-full h-[72px] flex items-center space-x-4 text-ps-gray-600 rounded-t-3xl">
        <label className="flex items-center">
          <span className="mr-3 font-bold">Pet Type:</span>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-orange-600 border-ps-gray-200 focus:ring focus:ring-orange-200"
          />
          <span className="ml-2 text-b2">Dog</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-orange-600"
          />
          <span className="ml-2 text-b2">Cat</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-orange-600"
          />
          <span className="ml-2 text-b2">Bird</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-orange-600"
          />
          <span className="ml-2 text-b2">Rabbit</span>
        </label>
      </div>
      <div className="bg-ps-white w-full h-[72px] flex p-6 items-center text-ps-gray-600 font-bold rounded-b-3xl drop-shadow-costom">
        Rating:
      </div>
    </div>
  );
};

export default SearchBar;

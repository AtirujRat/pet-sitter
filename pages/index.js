import SearchBar from "@/components/home/SearchBar";

export default function Home() {
  return (
    <section className="w-full flex-col items-center pt-20">
      <header className=" mx-auto w-full flex items-center justify-center h-fit gap-5">
        <img
          src="/assets/home/element-home-1.svg"
          alt="element-home-1"
          className="w-[428px]"
        />
        <div>
          <p className="text-[5.5rem] leading-[96px] font-[900] text-center text-shadow">
            Pet Sitter<span className="text-ps-orange-500">,</span>
            <br /> Perfect<span className="text-ps-blue-500">,</span>
            <br /> For Your Pet<span className="text-ps-yellow-200">.</span>
          </p>
          <p className="text-ps-gray-400 text-h3 text-center pt-8">
            Find your perfect pet sitter with us.
          </p>
        </div>
        <img
          src="/assets/home/element-home-2.svg"
          alt="element-home-2"
          className="w-[428px]"
        />
      </header>

      {/* SearchBar */}
      <div className="w-full my-16 flex justify-center">
        <SearchBar />
      </div>

      {/* content */}
      <div className="w-full max-w-[1440px] flex-col mx-auto p-20 ">
        <p className="text-h2 text-center mb-[120px]">
          "Your Pets, Our Priority: Perfect Care, Anytime, Anywhere."
        </p>
        <div className="max-w-[1064px] w-full mx-auto flex justify-between mb-[120px]">
          <div className="flex-col w-[504px]">
            <div className="flex pb-[55px]">
              <img
                src="/assets/home/star-bullet-blue.svg"
                alt="star"
                className="self-start"
              />
              <div className="pl-3">
                <p className="text-h3 pb-3">Boarding</p>
                <p className="text-b1 text-ps-gray-500">
                  Your pets stay overnight in your sitter’s home. They’ll be
                  treated like part of the family in a comfortable environment.
                </p>
              </div>
            </div>
            <div className="flex pb-[55px]">
              <img
                src="/assets/home/star-bullet-pink.svg"
                alt="star"
                className="self-start"
              />
              <div className="pl-3">
                <p className="text-h3 pb-3">House Sitting</p>
                <p className="text-b1 text-ps-gray-500">
                  Your sitter takes care of your pets and your home. Your pets
                  will get all the attention they need without leaving home.
                </p>
              </div>
            </div>
            <div className="flex pb-[55px]">
              <img
                src="/assets/home/star-bullet-green.svg"
                alt="star"
                className="self-start"
              />
              <div className="pl-3">
                <p className="text-h3 pb-3">Dog Walking</p>
                <p className="text-b1 text-ps-gray-500">
                  Your dog gets a walk around your neighborhood. Perfect for
                  busy days and dogs with extra energy to burn.
                </p>
              </div>
            </div>
            <div className="flex">
              <img
                src="/assets/home/star-bullet-yellow.svg"
                alt="star"
                className="self-start"
              />
              <div className="pl-3">
                <p className="text-h3 pb-3">Drop-In Visits</p>
                <p className="text-b1 text-ps-gray-500">
                  Your sitter drops by your home to play with your pets, offer
                  food, and give potty breaks or clean the litter box.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img src="/assets/home/element-home-3.svg" alt="element-home" />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[416px] flex-col">
            <div className="w-full flex justify-center pb-[46px]">
              <img
                src="/assets/home/connect.svg"
                alt="Connect With Sitters"
                width={268}
                height={268}
              />
            </div>
            <div className="px-6 text-center">
              <p className="text-h3 pb-3">
                <span className="text-ps-green-500">Connect</span> With Sitters
              </p>
              <p className="text-b1 text-ps-gray-500">
                Find a verified and reviewed sitter who’ll keep your pets
                company and give time.
              </p>
            </div>
          </div>
          <div className="w-[416px] flex-col">
            <div className="flex justify-center pb-[46px]">
              <img
                src="/assets/home/better.svg"
                alt="Connect With Sitters"
                width={268}
                height={268}
              />
            </div>
            <div className="px-6 text-center">
              <p className="text-h3 pb-3">
                <span className="text-ps-blue-500">Better</span> For Your Pets
              </p>
              <p className="text-b1 text-ps-gray-500">
                Pets stay happy at home with a sitter who gives them loving care
                and companionship.
              </p>
            </div>
          </div>
          <div className="w-[416px] flex-col">
            <div className="flex justify-center pb-[46px]">
              <img
                src="/assets/home/calling.svg"
                alt="Connect With Sitters"
                width={268}
                height={268}
              />
            </div>
            <div className="px-6 text-center">
              <p className="text-h3 pb-3">
                <span className="text-ps-orange-500">Calling</span> All Pets
              </p>
              <p className="text-b1 text-ps-gray-500">
                Stay for free with adorable animals in unique homes around the
                world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Find A Pet Sitter */}
      <div className="w-full max-w-[1440px] mx-auto p-20">
        <div className="w-full h-[448px] bg-ps-yellow-100 rounded-2xl relative flex justify-center items-center">
          <div className="absolute bottom-0 left-0">
            <img src="/assets/home/element-home-4.svg" alt="element-home" />
          </div>
          <div className="absolute top-0 right-0">
            <img src="/assets/home/element-home-5.svg" alt="element-home" />
          </div>
          <div className="w-[457px] text-center">
            <p className="text-h1 pb-10">Perfect Pet Sitter For Your Pet</p>
            <span className="flex px-9 justify-between items-center">
              <p className="text-[16px] font-bold text-ps-orange-500 px-3 py-6">
                Become A Pet Sitter
              </p>
              <button className="w-[168px] h-[48px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide">
                Find A Pet Sitter
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

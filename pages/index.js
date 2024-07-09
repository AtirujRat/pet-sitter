import SearchBar from "@/components/home/SearchBar";
import Image from "next/image";
import elementhome1 from "../public/assets/home/element-home-1.svg";
import elementhome2 from "../public/assets/home/element-home-2.svg";
import elementhome3 from "../public/assets/home/element-home-3.svg";
import elementhome4 from "../public/assets/home/element-home-4.svg";
import elementhome5 from "../public/assets/home/element-home-5.svg";
import starbulletblue from "../public/assets/home/star-bullet-blue.svg";
import starbulletpink from "../public/assets/home/star-bullet-pink.svg";
import starbulletgreen from "../public/assets/home/star-bullet-green.svg";
import starbulletyellow from "../public/assets/home/star-bullet-yellow.svg";
import connect from "../public/assets/home/connect.svg";
import calling from "../public/assets/home/calling.svg";
import better from "../public/assets/home/better.svg";

export default function Home() {
  return (
    <section className="w-full flex-col items-center lg:pt-20 pt-10 overflow-hidden ">
      <header className="max-w-[1440px] mx-auto w-full md:flex flex-col items-center justify-center md:h-[441px] h-[565] gap-5 relative">
        <div>
          <p className="lg:text-[5.5rem] sm:text-[68px] text-[56px] lg:leading-[96px] md:leading-[62px] leading-[66px] font-[900] text-center text-shadow">
            Pet Sitter<span className="text-ps-orange-500">,</span>
            <br /> Perfect<span className="text-ps-blue-500">,</span>
            <br /> For Your Pet<span className="text-ps-yellow-200">.</span>
          </p>
          <p className="text-ps-gray-400 md:text-h3 text-h4 text-center pt-8 ">
            Find your perfect pet sitter with us.
          </p>
        </div>
        <div className="flex gap-4 mt-[50px] md:mt-0 relative h-[255px] md:h-auto overflow-hidden md:w-full md:justify-between md:absolute md:left-0 md:pt-0 pt-[50px]">
          <div className=" w-[255px] lg:w-[428px] aspect-square absolute right-[calc(50%+8px)] top-0 md:static">
            <Image
              src={elementhome1}
              alt="element-home-1"
              sizes="100%"
              width={428}
              className="object-cover "
            />
          </div>
          <div className="w-[255px] lg:w-[428px] aspect-square absolute left-[calc(50%+8px)] top-0 md:static">
            <Image
              src={elementhome2}
              alt="element-home-2"
              sizes="100%"
              width={428}
              className="object-cover"
            />
          </div>
        </div>
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
              <Image
                src={starbulletblue}
                alt="star"
                width={24}
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
              <Image
                src={starbulletpink}
                width={24}
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
              <Image
                src={starbulletgreen}
                alt="star"
                width={24}
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
              <Image
                src={starbulletyellow}
                alt="star"
                width={24}
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
            <Image src={elementhome3} alt="element-home" width={455} />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[416px] flex-col">
            <div className="w-full flex justify-center pb-[46px]">
              <Image
                src={connect}
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
              <Image
                src={calling}
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
              <Image
                src={better}
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
          <div className="absolute bottom-0 left-0 ">
            <Image
              src={elementhome4}
              alt="element-home"
              width={337}
              className="bg-ps-yellow-100"
            />
          </div>
          <div className="absolute top-0 right-0">
            <Image
              src={elementhome5}
              alt="element-home"
              width={327}
              className="bg-ps-yellow-100"
            />
          </div>
          <div className="w-[457px] text-center">
            <p className="text-h1 pb-10 bg-ps-yellow-100">
              Perfect Pet Sitter For Your Pet
            </p>
            <span className="flex px-9 justify-between items-center bg-ps-yellow-100">
              <p className="text-[16px] font-bold text-ps-orange-500 px-3 py-6 bg-ps-yellow-100">
                Become A Pet Sitter
              </p>
              <button className="w-[168px] h-[48px] bg-ps-orange-500 text-ps-white text-[16px] font-bold rounded-full tracking-wide ">
                Find A Pet Sitter
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

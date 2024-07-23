import Image from "next/image";

import elementhome3 from "@/public/assets/home/element-home-3.svg";
import starbulletblue from "@/public/assets/home/star-bullet-blue.svg";
import starbulletpink from "@/public/assets/home/star-bullet-pink.svg";
import starbulletgreen from "@/public/assets/home/star-bullet-green.svg";
import starbulletyellow from "@/public/assets/home/star-bullet-yellow.svg";
import connect from "@/public/assets/home/connect.svg";
import calling from "@/public/assets/home/calling.svg";
import better from "@/public/assets/home/better.svg";

const ContentHomePage = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="w-full max-w-[1440px] flex-col mx-auto lg:p-20 md:px-8 px-4 md:py-10 bg-ps-white z-10">
        <p className="w-full lg:text-h2 text-h3 text-center lg:mb-[120px] mb-10">
          "Your Pets, Our Priority: Perfect Care, Anytime, Anywhere."
        </p>
        <div className="max-w-[1064px] w-full mx-auto md:flex-row flex flex-col gap-6 md:justify-between mb-[120px]">
          <div className="flex-col md:w-[504px] px-4 md:px-0">
            <div className="flex md:pb-[55px] pb-6 h-auto">
              <Image
                src={starbulletblue}
                alt="star"
                width={24}
                className="self-start"
              />
              <div className="pl-3">
                <p className="md:text-h3 text-h4 pb-3">Boarding</p>
                <p className="md:text-b1 text-b2 text-ps-gray-500 text-wrap">
                  Your pets stay overnight in your sitter’s home. They’ll be
                  treated like part of the family in a comfortable environment.
                </p>
              </div>
            </div>
            <div className="flex md:pb-[55px] pb-6">
              <Image
                src={starbulletpink}
                width={24}
                alt="star"
                className="self-start"
              />
              <div className="pl-3">
                <p className="md:text-h3 text-h4 pb-3">House Sitting</p>
                <p className="md:text-b1 text-b2 text-ps-gray-500">
                  Your sitter takes care of your pets and your home. Your pets
                  will get all the attention they need without leaving home.
                </p>
              </div>
            </div>
            <div className="flex md:pb-[55px] pb-6">
              <Image
                src={starbulletgreen}
                alt="star"
                width={24}
                className="self-start"
              />
              <div className="pl-3">
                <p className="md:text-h3 text-h4 pb-3">Dog Walking</p>
                <p className="md:text-b1 text-b2 text-ps-gray-500">
                  Your dog gets a walk around your neighborhood. Perfect for
                  busy days and dogs with extra energy to burn.
                </p>
              </div>
            </div>
            <div className="flex lg:pb-0 pb-10">
              <Image
                src={starbulletyellow}
                alt="star"
                width={24}
                className="self-start"
              />
              <div className="pl-3">
                <p className="md:text-h3 text-h4 pb-3">Drop-In Visits</p>
                <p className="md:text-b1 text-b2 text-ps-gray-500">
                  Your sitter drops by your home to play with your pets, offer
                  food, and give potty breaks or clean the litter box.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src={elementhome3} alt="element-home" width={455} />
          </div>
        </div>

        {/* section 2 */}
        <div className="w-full max-w-[1280px] flex flex-wrap gap-4 gap-y-10 justify-center">
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
          <div className="w-[416px] flex-col py-10 md:py-0 bg-ps-white">
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
    </div>
  );
};

export default ContentHomePage;

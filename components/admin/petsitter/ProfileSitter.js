import Image from "next/image";

import userImage from "@/public/assets/account/profile_white.svg";
import {
  DogBadge,
  CatBadge,
  BirdBadge,
  RabbitBadge,
} from "@/components/sitters/PetBadges";
import Map from "@/components/map/Map";

export default function ProfileSitter({ sitter }) {
  const petTypeComponents = {
    Dog: DogBadge,
    Cat: CatBadge,
    Bird: BirdBadge,
    Rabbit: RabbitBadge,
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex w-full gap-10">
        <div className="relative w-[240px] h-[240px] overflow-hidden rounded-full bg-ps-gray-200 shrink-0">
          {sitter?.profile_image_url ? (
            <Image
              src={sitter?.profile_image_url || null}
              alt={sitter?.full_name}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={userImage}
              alt="userImage"
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="bg-[#FAFAFB] p-6 gap-10 grow rounded-lg flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Full Name</p>
            <p>{sitter.full_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Experience</p>
            <p>{sitter.experience}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Phone</p>
            <p>{sitter.phone_number}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Introduction</p>
            <p>{sitter.introduction}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFB] p-6 grow rounded-lg">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">
              Pet sitter name (Trade Name)
            </p>
            <p>{sitter.trade_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Pet type</p>
            <div className="flex gap-2">
              {sitter.pet_types.map((pet, index) => {
                const BadgeComponent = petTypeComponents[pet];
                return <BadgeComponent key={index} />;
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Services</p>
            <p>{sitter.services || "-"}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">My Place</p>
            <p>{sitter.place_description || "-"}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-h4 text-ps-gray-300">Image Gallery</p>
            <div className="w-full flex gap-4">
              {sitter?.sitters_images?.map((image, index) => (
                <div key={index} className="w-[246px] h-[185px] relative">
                  <Image
                    src={image.image_url}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFB] p-6 grow rounded-lg mb-10 flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <p className="text-h4 text-ps-gray-300">Address</p>
          <p>{sitter?.sitters_addresses?.address_detail || "-"}</p>
          <p>{`${sitter?.sitters_addresses?.district || ""} ${
            sitter?.sitters_addresses?.sub_district || ""
          } ${sitter.sitters_addresses?.province || ""} ${
            sitter?.sitters_addresses?.post_code || ""
          }`}</p>
        </div>
        <div className="w-full h-[400px]">
          <Map draggable={false} />
        </div>
      </div>
    </div>
  );
}

import PetTypeBadge from "@/components/sitters/PetTypeBadge";
import petTypeColors from "@/public/data/petTypeColors";
import RatingStar from "./RatingStar";
import Link from "next/link";

export default function SittersList(props) {
  return (
    <div className="sitters-list flex-2 w-[70%] flex flex-col gap-4">
      {props.sitters.map((sitter) => {
        let galleryImage = "https://placehold.co/400x300";
        const profilePlaceholder = "https://placehold.co/200x200";
        if (sitter.sitters_images.length > 0) {
          galleryImage = sitter.sitters_images[0].image_url;
        }
        return (
          <Link href={`/sitters/${sitter.id}`}>
            <div
              className="sitter-item bg-ps-white p-4 flex gap-9 rounded-2xl min-w-[760px] hover:shadow-lg  transition-transform active:scale-95"
              key={sitter.id}
            >
              <img
                src={galleryImage}
                alt={`first gallery image for ${sitter.full_name}`}
                className="h-[185px] w-[245px] rounded-lg object-cover self-center"
              ></img>
              <div className="setter-info flex-col w-full">
                <div className="profile flex gap-5 my-2">
                  <img
                    src={sitter.profile_image_url ?? profilePlaceholder}
                    alt={`${sitter.full_name}-profile-image`}
                    className="rounded-full object-cover h-[64px] w-[64px]"
                  ></img>
                  <div className="sitter-title">
                    <h3 className="text-h3">{sitter.trade_name}</h3>
                    <p className="text-b1 leading-8">By {sitter.full_name}</p>
                  </div>
                </div>
                <div className="location flex gap-1 my-6">
                  <img src="/assets/sitters/icon-location.svg"></img>
                  <p className="text-b2 text-ps-gray-400">Senanikom, Bangkok</p>
                </div>
                <div className="pet-type flex gap-2">
                  {sitter.pet_types
                    .sort((a, b) => a.id - b.id)
                    .map((pet, index) => {
                      const colors = petTypeColors[pet.pet_type];
                      return (
                        <PetTypeBadge
                          type={pet.pet_type}
                          key={index}
                          textcolor={colors.textcolor}
                          bordercolor={colors.bordercolor}
                          bgcolor={colors.bgcolor}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="rating flex items-start min-w-fit h-fit justify-end my-2 mr-2 gap-1">
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

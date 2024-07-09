import PetTypeBadge from "@/components/sitters/PetTypeBadge";
import petTypeColors from "@/pages/utils/petTypeColors";
import RatingStar from "./RatingStar";

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
          <div
            className="sitter-item bg-ps-white p-4 flex gap-10 rounded-2xl min-w-[620px]"
            key={sitter.id}
          >
            <img
              src={galleryImage}
              height={185}
              width={245}
              alt={`first gallery image for ${sitter.full_name}`}
              className="rounded-lg object-cover"
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
                  <p className="text-b1">by {sitter.full_name}</p>
                </div>
              </div>
              <div className="location flex gap-1 my-7">
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
            <div className="rating flex items-start w-fit justify-end my-2 mr-2 gap-1">
              <RatingStar />
              <RatingStar />
              <RatingStar />
              <RatingStar />
              <RatingStar />
            </div>
          </div>
        );
      })}
    </div>
  );
}

import PetTypeBadge from "@/components/sitters/PetTypeBadge";

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
            className="sitter-item  bg-ps-white p-4 flex gap-10 rounded-2xl"
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
                <PetTypeBadge
                  type="Dog"
                  textcolor="text-ps-green-500"
                  bordercolor="border-ps-green-500"
                  bgcolor="bg-ps-green-100"
                />
                <PetTypeBadge
                  type="Cat"
                  textcolor="text-ps-pink-500"
                  bordercolor="border-ps-pink-500"
                  bgcolor="bg-ps-pink-100"
                />
                <PetTypeBadge
                  type="Bird"
                  textcolor="text-ps-blue-500"
                  bordercolor="border-ps-blue-500"
                  bgcolor="bg-ps-blue-100"
                />
                <PetTypeBadge
                  type="Rabbit"
                  textcolor="text-ps-orange-400"
                  bordercolor="border-ps-orange-400"
                  bgcolor="bg-ps-yellow-100"
                />
              </div>
            </div>
            <div className="rating flex items-start w-fit justify-end my-2 mr-2">
              <img
                src="/assets/star-rating.svg"
                height={20}
                alt="Star Rating"
              />
              <img
                src="/assets/star-rating.svg"
                height={20}
                alt="Star Rating"
              />
              <img
                src="/assets/star-rating.svg"
                height={20}
                alt="Star Rating"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

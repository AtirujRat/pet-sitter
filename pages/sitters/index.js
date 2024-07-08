import PetTypeBadge from "@/components/sitters/PetTypeBadge";

export default function Sitters() {
  return (
    <div className="page-container w-full px-20 bg-[#FAFAFB] py-8">
      <div className="title-container flex justify-between my-10">
        <div className="text-h3 text-ps-gray-600">Search For Pet Sitter</div>
        <div className="view-type flex gap-1 ">
          <button className="btn btn-outline ">
            <img src="/assets/sitters/icon-list.svg" alt="list-view"></img>
            List
          </button>
          <button className="btn btn-outline">
            <img src="/assets/sitters/icon-map.svg" alt="map-view"></img>Map
          </button>
        </div>
      </div>
      <div className="content-container flex gap-6">
        <div className="search-box flex-1 bg-ps-white w-[30%] h-40 rounded-2xl"></div>
        <div className="sitters-list flex-2 w-[70%] rounded-2xl">
          <div className="sitter-item  bg-ps-white p-4 flex gap-10">
            <img
              src="https://placedog.net/640/480?id=30"
              height={185}
              width={245}
              alt="sitter1-image"
              className="rounded-lg"
            ></img>
            <div className="setter-info flex-col">
              <div className="profile flex gap-5">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="sitter1-profile-image"
                  height={64}
                  width={64}
                  className="rounded-full"
                ></img>
                <div className="sitter-title">
                  <h3 className="text-h3">
                    Gentle for all pet! (Kid friendly)
                  </h3>
                  <p className="text-b1">by Umai</p>
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
            <div className="rating"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

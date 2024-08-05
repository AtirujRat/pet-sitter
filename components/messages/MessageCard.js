import { useEffect } from "react";
import axios from "axios";

export default function MessageCard({
  imgUrl,
  name,
  lastMessage,
  isClicked,
  onClick,
  unreadCount,
  id,
  userOwner,
}) {
  async function updateStatus(id) {
    try {
      if (userOwner.role === "owner") {
        await axios.put(`/api/owner/${userOwner.id}/conversations`, { id: id });
      } else {
        await axios.put(`/api/sitters/${userOwner.id}/conversations`, {
          id: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      updateStatus(id);
    }
  }, [lastMessage]);

  return (
    <section
      className={`relative w-full h-[92px] ${
        isClicked ? "bg-ps-gray-600" : "bg-none"
      } outline-none cursor-pointer`}
      tabIndex="0"
      onClick={() => {
        onClick();
      }}
    >
      <div className="flex gap-3 px-10 py-5 items-center">
        <img
          className="rounded-full object-cover w-12 h-12"
          src={imgUrl}
          alt="Profile"
        />
        <div className="w-[232px] max-md:w-[85%]">
          <div className="items-center flex justify-between w-full">
            <p className="text-b2 text-ps-white">{name}</p>
            {unreadCount > 0 && !isClicked && (
              <div className=" bg-ps-orange-500 text-ps-white text-b3 rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
          <p className="text-b3 text-ps-gray-400 w-full text-nowrap overflow-hidden text-ellipsis pr-8">
            {lastMessage}
          </p>
        </div>
      </div>
    </section>
  );
}

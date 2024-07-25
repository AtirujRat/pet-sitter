export default function MessageCard({
  imgUrl,
  nameInterlocutor,
  lastMessage,
  isClicked,
  onClick,
  unreadCount,
}) {
  return (
    <section
      className={`relative w-full h-[92px] ${
        isClicked ? "bg-ps-gray-600" : "bg-none"
      } outline-none cursor-pointer`}
      tabIndex="0"
      onClick={onClick}
    >
      <div className="flex gap-3 px-10 py-5 items-center">
        <img className="rounded-full w-12 h-12" src={imgUrl} alt="Profile" />
        <div className="w-[232px]">
          <div className="items-center flex justify-between w-full">
            <p className="text-b2 text-ps-white">{nameInterlocutor}</p>
            {unreadCount > 0 && (
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

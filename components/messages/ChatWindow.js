import Image from "next/image";

export default function ChatWindow({ conversation, onClose }) {
  if (!conversation) {
    return (
      <div className="flex justify-center items-center h-[90vh] w-full ">
        <p className="text-b1 text-ps-gray-300">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col justify-between">
      <div className="w-full flex justify-between bg-ps-gray-100 px-10 py-6">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-full bg-ps-orange-500 w-12 h-12"
            src={conversation.imgUrl}
            width={48}
            height={48}
            alt="Profile"
          />
          <h3 className="text-h3">{conversation.nameInterlocutor}</h3>
        </div>
        <Image
          className="hover:scale-110 focus:scale-100 transition-transform cursor-pointer"
          src="/assets/icons/icon-x.svg"
          width={24}
          height={24}
          alt="Close"
          onClick={onClose}
        />
      </div>
      <div className="w-full bg-ps-white flex justify-center items-center">
        <Image
          src="/assets/messages/pink-cat-foot.svg"
          className="absolute z-[-1] top-[50vh] left-[350px]"
          width={82}
          height={84}
          alt="Pink Cat"
        />
        <p className="absolute z-[-2] top-[55vh] left-[60vw] text-b1 text-ps-gray-300">
          Start a conversation!
        </p>
      </div>
      <div className="w-full flex justify-between border-t-[1px] border-ps-gray-200 bg-ps-white px-10 py-4 gap-6">
        <button className="bg-ps-gray-100 w-fit h-fit p-3 flex justify-center items-center rounded-full hover:scale-110 focus:scale-100 transition-transform ">
          <Image
            src="/assets/icons/icon-image.svg"
            width={24}
            height={24}
            alt="Send Image"
          />
        </button>
        <input
          type="text"
          placeholder="Message here..."
          className="w-full border-none rounded-3xl focus:ring-ps-orange-300"
        />
        <button className="bg-ps-orange-500 w-fit h-fit p-3 flex justify-center items-center rounded-full hover:scale-110 focus:scale-100 transition-transform shadow-md">
          <Image
            src="/assets/icons/icon-send.svg"
            width={24}
            height={24}
            alt="Send Message"
          />
        </button>
      </div>
    </section>
  );
}

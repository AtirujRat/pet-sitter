import Image from "next/image";

export default function ChatWindow({ conversation, onClose, messages }) {
  if (!conversation) {
    return (
      <div className="flex justify-center items-center h-[90vh] w-full">
        <p className="text-b1 text-ps-gray-300">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  const orderedMessages = [...conversation.messages].reverse();

  return (
    <section className="w-full h-full flex flex-col justify-between">
      {/* Header */}
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

      {/* Message Display Area */}
      <div className="w-full h-full bg-ps-white flex flex-col-reverse p-10 overflow-y-auto">
        {orderedMessages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-b1 text-ps-gray-300">Start a conversation!</p>
          </div>
        ) : (
          orderedMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "owner" ? "justify-end" : "justify-start"
              } mb-4 items-end`}
            >
              {message.sender === "sitter" && (
                <img
                  src={conversation.imgUrl}
                  alt="sitter"
                  className="w-10 h-10 rounded-full mr-2"
                  width={40}
                  height={40}
                />
              )}
              <div
                className={`px-6 py-4 border-ps-gray-200 border-[1px] rounded-3xl ${
                  message.sender === "owner" ? "rounded-br" : "rounded-bl"
                } max-w-md ${
                  message.sender === "owner"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="w-full flex justify-between border-t-[1px] border-ps-gray-200 bg-ps-white px-10 py-4 gap-6">
        <button className="bg-ps-gray-100 w-fit h-fit p-3 flex justify-center items-center rounded-full hover:scale-110 focus:scale-100 transition-transform">
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
          className="w-full text-ps-gray-600 rounded-lg border-none focus:border-ps-orange-300 outline-none"
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

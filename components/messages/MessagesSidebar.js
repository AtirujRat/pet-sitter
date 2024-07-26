import { useContext } from "react";
import { ConversationContext } from "@/pages/owners/[id]/messages";
import MessageCard from "./MessageCard";

export default function MessagesSidebar({ onSend }) {
  const { conversations, selectedConversationId, handleCardClick } =
    useContext(ConversationContext);

  return (
    <section>
      <div className="pt-4 w-[368px] h-full bg-ps-black">
        <div className="w-full px-10 py-6">
          <h3 className="text-h3 text-ps-white">Messages</h3>
        </div>
        {conversations.map((conversation) => (
          <MessageCard
            key={conversation.id}
            imgUrl={conversation.sitters?.profile_image_url}
            nameSitter={conversation.sitters?.full_name}
            unreadCount={
              conversation.messages.filter((msg) => msg.status === "unread")
                .length
            }
            lastMessage={
              conversation.messages[conversation.messages.length - 1]?.text
            }
            isClicked={selectedConversationId === conversation.id}
            onClick={() => {
              handleCardClick(conversation.id);
              onSend();
            }}
          />
        ))}
      </div>
    </section>
  );
}

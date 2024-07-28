import { useContext } from "react";
import { ConversationSitterContext } from "@/pages/sitters/[id]/messages";
import MessageCard from "./MessageCard";

export default function MessagesSidebarSitter() {
  const { conversations, selectedConversationId, handleCardClick } = useContext(
    ConversationSitterContext
  );

  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return (
    <section>
      <div className="pt-4 w-[368px] h-full bg-ps-black">
        <div className="w-full px-10 py-6">
          <h3 className="text-h3 text-ps-white">Messages</h3>
        </div>
        {sortedConversations.map((conversation) => (
          <MessageCard
            key={conversation.id}
            imgUrl={conversation.sitters?.profile_image_url}
            nameSitter={conversation.sitters?.full_name}
            unreadCount={
              conversation.messages.filter(
                (msg) => msg.sitter_status === "unread"
              ).length
            }
            lastMessage={
              conversation.messages[conversation.messages.length - 1]?.text
            }
            isClicked={selectedConversationId === conversation.id}
            onClick={() => handleCardClick(conversation.id)}
          />
        ))}
      </div>
    </section>
  );
}

import { useContext } from "react";
import { ConversationOwnerContext } from "@/pages/owners/[id]/messages";
import { ConversationSitterContext } from "@/pages/sitters/[id]/messages";
import MessageCard from "./MessageCard";

export default function MessagesSidebar({ userType }) {
  const isOwner = userType === "owner";
  const { conversations, selectedConversationId, handleCardClick } = useContext(
    isOwner ? ConversationOwnerContext : ConversationSitterContext
  );

  const sortedConversations = conversations.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return (
    <section>
      <div className="pt-4 w-[368px] h-full bg-ps-black">
        <div className="w-full px-10 py-6">
          <h3 className="text-h3 text-ps-white">Messages</h3>
        </div>
        {sortedConversations.length > 0 ? (
          sortedConversations.map((conversation) => {
            const sortedMessages = conversation.messages.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            const lastMessage =
              sortedMessages.length > 0 ? sortedMessages[0] : null;

            const displayContent = lastMessage
              ? lastMessage.message_image_url
                ? "Image file"
                : lastMessage.text || "No message content"
              : "No messages yet";

            return (
              <MessageCard
                key={conversation.id}
                imgUrl={
                  isOwner
                    ? conversation.sitters?.profile_image_url
                    : conversation.owners?.profile_image_url
                }
                name={
                  isOwner
                    ? conversation.sitters?.full_name
                    : conversation.owners?.full_name
                }
                unreadCount={
                  conversation.messages.filter(
                    (msg) =>
                      msg[isOwner ? "owner_status" : "sitter_status"] ===
                      "unread"
                  ).length
                }
                lastMessage={displayContent}
                isClicked={selectedConversationId === conversation.id}
                onClick={() => handleCardClick(conversation.id)}
              />
            );
          })
        ) : (
          <p className="text-ps-white px-10">No conversations found.</p>
        )}
      </div>
    </section>
  );
}

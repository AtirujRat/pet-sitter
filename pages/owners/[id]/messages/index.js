import { useState } from "react";
import MessagesSidebar from "@/components/messages/MessagesSidebar";
import ChatWindow from "@/components/messages/ChatWindow";
import conversations from "@/components/messages/conversationsData";

export default function ConversationPage() {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );

  const unreadCount =
    selectedConversation?.messages.filter(
      (message) => message.status === "unread"
    ).length || 0;

  const handleCardClick = (id) => {
    setSelectedConversationId(id);
    setIsChatWindowOpen(true);
  };

  const handleCloseChatWindow = () => {
    setIsChatWindowOpen(false);
    setSelectedConversationId(null);
  };

  return (
    <section className="w-full h-[90.5vh] flex">
      <MessagesSidebar
        clickedCardId={selectedConversationId}
        onCardClick={handleCardClick}
        unreadCount={unreadCount}
      />
      {isChatWindowOpen && selectedConversation && (
        <ChatWindow
          conversation={selectedConversation}
          onClose={handleCloseChatWindow}
          messages={selectedConversation.messages}
        />
      )}
    </section>
  );
}

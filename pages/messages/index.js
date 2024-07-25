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
      />
      {isChatWindowOpen && (
        <ChatWindow
          conversation={selectedConversation}
          onClose={handleCloseChatWindow}
        />
      )}
    </section>
  );
}

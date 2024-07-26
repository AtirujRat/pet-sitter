import { createContext, useEffect, useState } from "react";
import ChatWindowOwner from "@/components/messages/ChatWindowOwner";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import MessagesSidebarOwner from "@/components/messages/MessagesSidebarOwner";

export const ConversationOwnerContext = createContext();
const API_URL = "/api/owner";

export default function ConversationOwnerPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const [isSend, setIsSend] = useState(null);

  const [userOwner, setUserOwner] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userInfo");
      return savedState ? JSON.parse(savedState) : {};
    }
  });

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      let sortedConversations;

      try {
        if (userOwner.id) {
          const response = await axios.get(
            `${API_URL}/${userOwner.id}/conversations`
          );

          sortedConversations = [...response.data].sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
          );
        }
        setConversations(sortedConversations);
        console.log(sortedConversations);

        setLoading(false);

        if (!selectedConversationId) {
          setSelectedConversationId(sortedConversations[0].id);
        }
      } catch {
        setLoading(true);
      }
    };

    fetchConversations();
  }, [isSend]);

  useEffect(() => {
    const handleMessageInserts = (payload) => {
      const newMessage = payload.new;
      handleSendMessage(newMessage);
    };

    const messageListener = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleMessageInserts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, []);

  const handleCardClick = (id) => {
    setSelectedConversationId(id);
    setIsChatWindowOpen(true);
  };

  const handleCloseChatWindow = () => {
    setIsChatWindowOpen(false);
    setSelectedConversationId(null);
  };

  const handleOnSend = () => {
    setIsSend(!isSend);
  };

  return (
    <ConversationOwnerContext.Provider
      value={{
        conversations,
        selectedConversationId,
        handleCardClick,
      }}
    >
      <section className="w-full h-[91vh] flex">
        <MessagesSidebarOwner onSend={handleOnSend} />
        {isChatWindowOpen && selectedConversation && (
          <ChatWindowOwner
            conversation={selectedConversation}
            onClose={handleCloseChatWindow}
            onSend={handleOnSend}
          />
        )}
      </section>
    </ConversationOwnerContext.Provider>
  );
}
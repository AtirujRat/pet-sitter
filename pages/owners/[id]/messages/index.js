import { createContext, useEffect, useState } from "react";
import MessagesSidebar from "@/components/messages/MessagesSidebar";
import ChatWindow from "@/components/messages/ChatWindow";
import axios from "axios";
import { supabase } from "@/utils/supabase";

export const ConversationContext = createContext();
const API_URL = "/api/owner";

export default function ConversationPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const [isSend, setIsSend] = useState(null);

  const [user, setUser] = useState(() => {
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
      try {
        if (user.id) {
          const response = await axios.get(
            `${API_URL}/${user.id}/conversations`
          );
          setConversations(response.data);
        }
        setLoading(false);
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
    <ConversationContext.Provider
      value={{
        conversations,
        selectedConversationId,
        handleCardClick,
      }}
    >
      <section className="w-full h-[91vh] flex">
        <MessagesSidebar onSend={handleOnSend} />
        {isChatWindowOpen && selectedConversation && (
          <ChatWindow
            conversation={selectedConversation}
            onClose={handleCloseChatWindow}
            onSend={handleOnSend}
          />
        )}
      </section>
    </ConversationContext.Provider>
  );
}

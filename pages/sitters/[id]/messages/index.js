import { createContext, useEffect, useState } from "react";
import ChatWindow from "@/components/messages/ChatWindow";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import MessageSidebar from "@/components/messages/MessageSidebar";

export const ConversationSitterContext = createContext();
const API_URL = "/api/sitters";

export default function ConversationSitterPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const [isSend, setIsSend] = useState(null);

  const [userSitter, setUserSitter] = useState(() => {
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
        if (userSitter.id) {
          const response = await axios.get(
            `${API_URL}/${userSitter.id}/conversations`
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

    setTimeout(() => {
      fetchConversations();
    }, 5000);
  }, [conversations]);

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
    <ConversationSitterContext.Provider
      value={{
        conversations,
        selectedConversationId,
        handleCardClick,
      }}
    >
      <section className="w-full h-[91vh] flex">
        <MessageSidebar onSend={handleOnSend} userType="sitter" />
        {isChatWindowOpen && selectedConversation && (
          <ChatWindow
            conversation={selectedConversation}
            userType="sitter"
            onClose={handleCloseChatWindow}
            onSend={handleOnSend}
            user={userSitter.id}
          />
        )}
      </section>
    </ConversationSitterContext.Provider>
  );
}

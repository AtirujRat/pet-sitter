import { createContext, useEffect, useState } from "react";
import MessagesSidebar from "@/components/messages/MessagesSidebar";
import ChatWindow from "@/components/messages/ChatWindow";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import axios from "axios";
import { supabase } from "@/utils/supabase";

export const ConversationContext = createContext();
const API_URL = "/api/owner";

export default function ConversationPage() {
  const router = useRouter();
  const { id } = router.query;
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        if (id) {
          const response = await axios.get(`${API_URL}/${id}/conversations`);
          setConversations(response.data);
        }
        setLoading(false);
      } catch {
        setLoading(true);
      }
    };

    fetchConversations();
  }, [id]);

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

  if (loading) {
    return <Loading />;
  }

  const handleCardClick = (id) => {
    setSelectedConversationId(id);
    setIsChatWindowOpen(true);
  };

  const handleCloseChatWindow = () => {
    setIsChatWindowOpen(false);
    setSelectedConversationId(null);
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
        <MessagesSidebar />
        {isChatWindowOpen && selectedConversation && (
          <ChatWindow
            conversation={selectedConversation}
            onClose={handleCloseChatWindow}
          />
        )}
      </section>
    </ConversationContext.Provider>
  );
}

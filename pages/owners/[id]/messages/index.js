import { createContext, useEffect, useState } from "react";
import ChatWindow from "@/components/messages/ChatWindow";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import MessageSidebar from "@/components/messages/MessageSidebar";
import Image from "next/image";

export const ConversationOwnerContext = createContext();
const API_URL = "/api/owner";

export default function ConversationOwnerPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const [isSend, setIsSend] = useState(null);
  const [messages, setMessages] = useState();

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

        setLoading(false);

        if (!selectedConversationId && sortedConversations.length > 0) {
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

  const handleCardClick = async (id) => {
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
        <MessageSidebar onSend={handleOnSend} userType="owner" />
        {!selectedConversation ? (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full text-center bg-ps-gray-100">
            <Image
              src="/assets/messages/pink-cat-foot.svg"
              width={82}
              height={84}
            />
            <p className="text-ps-gray-300 text-b1">Select a conversation!</p>
          </div>
        ) : (
          isChatWindowOpen &&
          selectedConversation && (
            <ChatWindow
              conversation={selectedConversation}
              userType="owner"
              onClose={handleCloseChatWindow}
              onSend={handleOnSend}
              user={userOwner.id}
            />
          )
        )}
      </section>
    </ConversationOwnerContext.Provider>
  );
}

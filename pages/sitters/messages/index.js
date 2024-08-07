import { createContext, useEffect, useState } from "react";
import ChatWindow from "@/components/messages/ChatWindow";
import axios from "axios";
import Image from "next/image";
import MessageSidebar from "@/components/messages/MessageSidebar";
import AlertTop from "@/components/alerts/AlertTop";
import { useRouter } from "next/navigation";

export const ConversationSitterContext = createContext();
const API_URL = "/api/sitters";

export default function ConversationSitterPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const [isSend, setIsSend] = useState(null);
  const [error, setError] = useState(null);
  const [alertKey, setAlertKey] = useState(0);
  const router = useRouter();

  const [userSitter, setUserSitter] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userInfo");
      return savedState ? JSON.parse(savedState) : {};
    }
  });

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );

  const fetchConversations = async () => {
    if (!userSitter.id) {
      router.push("/404");
      return;
    }

    let sortedConversations;

    try {
      if (userSitter.id) {
        const response = await axios.get(
          `${API_URL}/${userSitter.id}/conversations`
        );

        sortedConversations = [...response.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      }
      setConversations(sortedConversations);

      if (!selectedConversationId && sortedConversations.length > 0) {
        setSelectedConversationId(sortedConversations[0].id);
      }
    } catch {
      setError("Error loading conversations");
      setAlertKey((prevKey) => prevKey + 1);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [isSend]);

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
    <ConversationSitterContext.Provider
      value={{
        conversations,
        selectedConversationId,
        handleCardClick,
      }}
    >
      <section className="w-full h-[91vh] flex">
        <MessageSidebar
          onSend={handleOnSend}
          userType="sitter"
          fetchConversations={fetchConversations}
        />
        {!selectedConversation ? (
          <div className="max-sm:hidden flex flex-col items-center justify-center gap-2 w-full h-full text-center bg-ps-gray-100">
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
              userType="sitter"
              onClose={handleCloseChatWindow}
              onSend={handleOnSend}
              user={userSitter.id}
            />
          )
        )}
        {/* alert */}
        {error && <AlertTop key={alertKey} type="error" text={error} />}
      </section>
    </ConversationSitterContext.Provider>
  );
}
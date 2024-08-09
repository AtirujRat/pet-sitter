import { useContext, useEffect, useState } from "react";
import { ConversationOwnerContext } from "@/pages/owners/messages";
import { ConversationSitterContext } from "@/pages/sitters/messages";
import MessageCard from "./MessageCard";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MessagesSidebar({
  userType,
  onSend,
  fetchConversations,
}) {
  const isOwner = userType === "owner";
  const { conversations, selectedConversationId, handleCardClick } = useContext(
    isOwner ? ConversationOwnerContext : ConversationSitterContext
  );
  const router = useRouter();

  const [userOwner, setUserOwner] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userInfo");
      return savedState ? JSON.parse(savedState) : {};
    }
  });

  const sortedConversations = conversations.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const channels = supabase
    .channel("Message-sidebar")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        if (payload.eventType === "INSERT") {
          fetchConversations();
        }
      }
    )
    .subscribe();

  async function updateStatus(id) {
    try {
      if (userOwner.role === "owner") {
        await axios.put(`/api/owner/${userOwner.id}/conversations`, { id: id });
      } else {
        await axios.put(`/api/sitters/${userOwner.id}/conversations`, {
          id: id,
        });
      }
      onSend();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      <div className="pt-4 w-[368px] max-sm:absolute max-sm:top-0 max-sm:z-[60] z-40 max-sm:w-full h-full bg-ps-black overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 w-full px-10 py-6">
          <button className="sm:hidden" onClick={() => router.back()}>
            <Image
              src="/assets/icons/icon-previous.svg"
              alt="icon-previous"
              width={24}
              height={24}
            />
          </button>
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
                ? `${
                    lastMessage.sender_role === userType ? "You: " : ""
                  }Image file`
                : `${lastMessage.sender_role === userType ? "You: " : ""}${
                    lastMessage.text || "No message content"
                  }`
              : "";

            return (
              <MessageCard
                key={conversation.id}
                id={conversation.id}
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
                userOwner={userOwner}
                onSend={onSend}
                isClicked={selectedConversationId === conversation.id}
                onClick={() => {
                  handleCardClick(conversation.id);
                  updateStatus(conversation.id);
                }}
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

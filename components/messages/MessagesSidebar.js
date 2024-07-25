import { useRouter } from "next/router";
import axios from "axios";
import MessageCard from "./MessageCard";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const API_URL = "/api/owner";

export default function MessagesSidebar({ clickedCardId, onCardClick }) {
  const router = useRouter();
  const { id } = router.query;
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);

      try {
        if (id) {
          const response = await axios.get(`${API_URL}/${id}/conversations`);
          setConversations(response.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };

    fetchConversations();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!conversations.length) {
    return <div>No conversations found.</div>;
  }

  return (
    <section>
      <div className="pt-4 w-[368px] h-full bg-ps-black">
        <div className="w-full px-10 py-6">
          <h3 className="text-h3 text-ps-white">Messages</h3>
        </div>
        {conversations.map((conversation) => (
          <MessageCard
            key={conversation.id}
            imgUrl={conversation.sitters?.profile_image_url}
            nameSitter={conversation.sitters?.full_name}
            unreadCount={
              conversation.messages.filter((msg) => msg.status === "unread")
                .length
            }
            lastMessage={
              conversation.messages[conversation.messages.length - 1]?.text
            }
            isClicked={clickedCardId === conversation.id}
            onClick={() => onCardClick(conversation.id)}
          />
        ))}
      </div>
    </section>
  );
}

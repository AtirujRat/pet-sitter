import MessageCard from "./MeassageCard";
import conversations from "./conversationsData";

export default function MessagesSidebar({ clickedCardId, onCardClick }) {
  return (
    <section>
      <div className="pt-4 w-[368px] h-full bg-ps-black">
        <div className="w-full px-10 py-6">
          <h3 className="text-h3 text-ps-white">Messages</h3>
        </div>
        {conversations.map((conversation) => (
          <MessageCard
            key={conversation.id}
            imgUrl={conversation.imgUrl}
            nameInterlocutor={conversation.nameInterlocutor}
            unreadCount={conversation.unreadCount}
            lastMessage={conversation.lastMessage}
            isClicked={clickedCardId === conversation.id}
            onClick={() => onCardClick(conversation.id)}
          />
        ))}
      </div>
    </section>
  );
}

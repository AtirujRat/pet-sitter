const conversations = [
  {
    id: 1,
    imgUrl: "https://i.pravatar.cc/100",
    nameInterlocutor: "John Doe",
    lastMessage: "How's your pet doing?",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        text: "Hi John, how's everything going with my dog?",
        sender: "owner",
        status: "read",
      },
      {
        id: 2,
        text: "Everything's great! Your dog is enjoying the walks.",
        sender: "sitter",
        status: "read",
      },
      {
        id: 3,
        text: "Glad to hear that! Is there anything I should be aware of?",
        sender: "owner",
        status: "unread",
      },
      {
        id: 4,
        text: "No issues at all. Just a little extra playtime today!",
        sender: "sitter",
        status: "unread",
      },
    ],
  },
  {
    id: 2,
    imgUrl: "https://i.pravatar.cc/200",
    nameInterlocutor: "Jane Smith",
    lastMessage: "I’m doing everything I can to find your cat.",
    unreadCount: 4, // Updated unread count
    messages: [
      {
        id: 1,
        text: "Hi, I’m really sorry, but your cat is missing.",
        sender: "sitter",
        status: "unread",
      },
      {
        id: 2,
        text: "What?! How could this happen? I’m so angry right now!",
        sender: "owner",
        status: "unread",
      },
      {
        id: 3,
        text: "I understand your frustration. I’m doing everything I can to find your cat.",
        sender: "sitter",
        status: "unread",
      },
      {
        id: 4,
        text: "This is unacceptable! I trusted you to take care of my pet. What steps are you taking to resolve this?",
        sender: "owner",
        status: "unread",
      },
      {
        id: 5,
        text: "I’ve already notified the local shelters and posted on social media. I’m also checking with nearby neighbors.",
        sender: "sitter",
        status: "unread",
      },
      {
        id: 6,
        text: "Please keep me updated. I expect constant updates until this is resolved.",
        sender: "owner",
        status: "unread",
      },
      {
        id: 7,
        text: "Of course, I will keep you informed. I’m so sorry for this situation and will do everything possible to find your cat.",
        sender: "sitter",
        status: "unread",
      },
    ],
  },
  {
    id: 3,
    imgUrl: "https://i.pravatar.cc/300",
    nameInterlocutor: "Alice Johnson",
    lastMessage: "Can we reschedule the visit?",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        text: "Hello Alice, can we confirm the pet-sitting schedule for today?",
        sender: "owner",
        status: "read",
      },
      {
        id: 2,
        text: "I’m sorry, but I need to reschedule. Can we do tomorrow instead?",
        sender: "sitter",
        status: "read",
      },
    ],
  },
  {
    id: 4,
    imgUrl: "https://i.pravatar.cc/400",
    nameInterlocutor: "Bob Brown",
    lastMessage: "I'll send you the updated schedule soon.",
    unreadCount: 3,
    messages: [
      {
        id: 1,
        text: "Hi Bob, did you get a chance to update the pet-sitting schedule?",
        sender: "owner",
        status: "read",
      },
      {
        id: 2,
        text: "Yes, I’m working on it now.",
        sender: "sitter",
        status: "read",
      },
      {
        id: 3,
        text: "Great, let me know once it's finalized.",
        sender: "owner",
        status: "unread",
      },
      {
        id: 4,
        text: "Will do. Thanks for your patience!",
        sender: "sitter",
        status: "unread",
      },
    ],
  },
  {
    id: 5,
    imgUrl: "https://i.pravatar.cc/500",
    nameInterlocutor: "Charlie Davis",
    lastMessage: "Good morning!",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        text: "Good morning, Charlie! How is my pet today?",
        sender: "owner",
        status: "read",
      },
      {
        id: 2,
        text: "Morning! Your pet is doing great, thanks for asking.",
        sender: "sitter",
        status: "unread",
      },
      {
        id: 3,
        text: "That’s wonderful to hear! Any concerns or issues?",
        sender: "owner",
        status: "read",
      },
      {
        id: 4,
        text: "No concerns at all. Just a little extra energy today!",
        sender: "sitter",
        status: "read",
      },
      {
        id: 5,
        text: "Perfect. Can you make sure to give some extra playtime?",
        sender: "owner",
        status: "unread",
      },
      {
        id: 6,
        text: "Absolutely! I’ll make sure of that.",
        sender: "sitter",
        status: "read",
      },
      {
        id: 7,
        text: "Thank you! Also, please remember to give them their medication.",
        sender: "owner",
        status: "unread",
      },
      {
        id: 8,
        text: "Got it! I’ll make sure the medication is given as instructed.",
        sender: "sitter",
        status: "read",
      },
    ],
  },
];

export default conversations;

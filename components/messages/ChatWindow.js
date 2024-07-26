import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase"; // adjust the path if necessary
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";

export default function ChatWindow({ conversation, onClose }) {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState(conversation.messages || []);

  const initialValues = {
    newMessage: "",
  };

  useEffect(() => {
    const handleInserts = (payload) => {
      setMessages((prevMessages) => [payload.new, ...prevMessages]);
    };

    const messageListener = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        handleInserts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, [conversation.id]);

  const orderedMessages = [...messages]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .reverse();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data, error } = await supabase.from("messages").insert([
        {
          conversation_id: conversation.id,
          text: values.newMessage,
          sender_role: "owner",
        },
      ]);

      if (error) throw error;

      resetForm();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-between">
      <div className="w-full flex justify-between bg-ps-gray-100 px-10 py-6">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-full bg-ps-orange-500 w-12 h-12"
            src={conversation.sitters?.profile_image_url}
            width={48}
            height={48}
            alt="Profile"
          />
          <h3 className="text-h3">{conversation.sitters?.full_name}</h3>
        </div>
        <Image
          className="hover:scale-110 focus:scale-100 transition-transform cursor-pointer"
          src="/assets/icons/icon-x.svg"
          width={24}
          height={24}
          alt="Close"
          onClick={onClose}
        />
      </div>

      <div className="w-full h-full bg-ps-white flex flex-col-reverse p-10 overflow-y-auto">
        {orderedMessages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-b1 text-ps-gray-300">Start a conversation!</p>
          </div>
        ) : (
          orderedMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_role === "owner"
                  ? "justify-end"
                  : "justify-start"
              } mb-4 items-end`}
            >
              {message.sender_role === "sitter" && (
                <img
                  src={conversation.sitters?.profile_image_url}
                  alt="sitter"
                  className="w-10 h-10 rounded-full mr-2"
                  width={40}
                  height={40}
                />
              )}
              <div
                className={`px-6 py-4 border-ps-gray-200 border-[1px] hover:border-ps-orange-400 rounded-3xl ${
                  message.sender_role === "owner"
                    ? "rounded-br hover:translate-y-2"
                    : "rounded-bl hover:translate-x-2"
                } max-w-md ${
                  message.sender_role === "owner"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } hover:scale-105 transition-transform duration-300`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full flex justify-between border-t-[1px] border-ps-gray-200 bg-ps-white px-10 py-4 gap-6">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-full flex items-center gap-6">
              <button className="bg-ps-gray-100 w-fit h-fit p-3 flex justify-center items-center rounded-full hover:scale-110 focus:scale-100 transition-transform">
                <Image
                  src="/assets/icons/icon-image.svg"
                  width={24}
                  height={24}
                  alt="Send Image"
                />
              </button>
              <Field
                type="text"
                name="newMessage"
                placeholder="Message here..."
                className="w-full text-ps-gray-600 rounded-lg border-none focus:border-ps-orange-300 outline-none"
              />
              <button
                type="submit"
                className="bg-ps-orange-500 w-fit h-fit p-3 flex justify-center items-center rounded-full hover:scale-110 focus:scale-100 transition-transform shadow-md"
                disabled={isSubmitting}
              >
                <Image
                  src="/assets/icons/icon-send.svg"
                  width={24}
                  height={24}
                  alt="Send Message"
                />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

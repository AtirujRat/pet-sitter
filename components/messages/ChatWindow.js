import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ChatWindow({
  conversation,
  userType,
  onClose,
  onSend,
  user,
}) {
  const [messages, setMessages] = useState(conversation.messages || []);
  useEffect(() => {
    setMessages(conversation.messages || []);
    const handleInserts = (payload) => {
      if (payload.eventType === "INSERT") {
        setMessages((prevMessages) => [payload.new, ...prevMessages]);
      }
    };

    const messageListener = supabase
      .channel("Chat-window")
      .on(
        "postgres_changes",
        {
          event: "*",
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

  useEffect(() => {
    onSend();
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full h-full text-center bg-ps-gray-100">
        <Image
          src="/assets/messages/pink-cat-foot.svg"
          width={82}
          height={84}
        />
        <p className="text-ps-gray-300 text-b1">Start a conversation!</p>
      </div>
    );
  }

  let status = "text";
  const initialValues = {
    newMessage: "",
  };

  const orderedMessages = [...messages]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .reverse();

  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    updateProfile(file);
  };

  async function updateProfile(file) {
    if (file && file.size > 2 * 1024 * 1024) {
      return alert("Profile image should not exceed 2 MB.");
    }

    try {
      let profileImageUrl = null;

      profileImageUrl = await uploadProfileImage(file, "message_image");
      status = "image";
      onSubmit(profileImageUrl);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  }
  async function uploadProfileImage(file, folder) {
    const fileName = uuidv4();
    const { data, error } = await supabase.storage
      .from("conversations")
      .upload(`${folder}/${fileName}`, file);

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
    const url = supabase.storage
      .from("conversations/message_image")
      .getPublicUrl(fileName).data.publicUrl;
    return url;
  }

  const onSubmit = async (values) => {
    let data;
    if (values.newMessage) {
      data = {
        conversation_id: conversation.id,
        text: values.newMessage,
        sender_role: userType,
      };
    } else {
      data = {
        conversation_id: conversation.id,
        sender_role: userType,
        message_image_url: values,
      };
    }
    try {
      if (userType === "owner") {
        await axios.post(`/api/owner/${user}/message`, data);
      } else if (userType === "sitter") {
        await axios.post(`/api/sitters/${user}/message`, data);
      }

      onSend();
      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section className="w-full h-full max-sm:absolute max-sm:top-0 z-20 flex flex-col justify-between">
      <div className="w-full flex justify-between bg-ps-gray-100 px-10 py-6">
        <div className="flex gap-4 items-center">
          <img
            className="max-sm:hidden rounded-full bg-ps-orange-500 w-12 h-12 object-cover"
            src={
              userType === "owner"
                ? conversation.sitters?.profile_image_url
                : conversation.owners?.profile_image_url
            }
            width={48}
            height={48}
            alt="Profile"
          />
          <button className="sm:hidden" onClick={onClose}>
            <Image
              src="/assets/icons/icon-previous.svg"
              alt="icon-previous"
              width={24}
              height={24}
            />
          </button>
          <h3 className="text-h3">
            {userType === "owner"
              ? conversation.sitters?.full_name
              : conversation.owners?.full_name}
          </h3>
        </div>
        <Image
          className="max-sm:hidden hover:scale-110 focus:scale-100 transition-transform cursor-pointer"
          src="/assets/icons/icon-x.svg"
          width={24}
          height={24}
          alt="Close"
          onClick={onClose}
        />
      </div>

      <div className="w-full h-full bg-ps-white flex flex-col-reverse p-10 overflow-y-auto">
        {orderedMessages.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center h-full">
            <Image
              src="/assets/messages/pink-cat-foot.svg"
              width={82}
              height={84}
            />
            <p className="text-b1 text-ps-gray-300">Start a conversation!</p>
          </div>
        ) : (
          orderedMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_role === userType
                  ? "justify-end"
                  : "justify-start"
              } mb-4 items-end`}
            >
              {message.sender_role !== userType && (
                <img
                  src={
                    userType === "owner"
                      ? conversation.sitters?.profile_image_url
                      : conversation.owners?.profile_image_url
                  }
                  alt={userType === "owner" ? "owner" : "sitter"}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                  width={40}
                  height={40}
                />
              )}

              {message.text ? (
                <div
                  className={`px-6 py-4 border-ps-gray-200 border-[1px] hover:border-ps-orange-400 rounded-3xl ${
                    message.sender_role === userType
                      ? "rounded-br hover:translate-y-2"
                      : "rounded-bl hover:translate-x-2"
                  } max-w-md ${
                    message.sender_role === userType
                      ? "bg-ps-orange-600 text-ps-white text-b2"
                      : "bg-ps-white text-b2"
                  } hover:scale-105 transition-transform duration-300`}
                >
                  {message.text}
                </div>
              ) : message.message_image_url ? (
                <img
                  src={message.message_image_url}
                  alt="Message Image"
                  className="w-[240px] h-[240px] rounded-lg object-cover hover:translate-x-2 hover:scale-105 transition-transform duration-300"
                />
              ) : null}
            </div>
          ))
        )}
      </div>

      <div className="w-full flex justify-between border-t-[1px] border-ps-gray-200 bg-ps-white px-10 py-4 gap-6">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (!values.newMessage.trim()) {
              setSubmitting(false);
              return;
            }
            onSubmit(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full flex items-center gap-6">
              <button
                type="button"
                className="bg-ps-gray-100 w-fit h-fit p-3 flex justify-center items-center rounded-full hover:scale-110 focus:scale-100 transition-transform relative"
              >
                <Image
                  src="/assets/icons/icon-image.svg"
                  width={24}
                  height={24}
                  alt="Send Image"
                />
                <input
                  className="w-full h-full cursor-pointer opacity-0 absolute"
                  type="file"
                  name="profile_image_url"
                  onChange={handleImageChange}
                  accept="image/jpeg, image/png, image/jpg"
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
                onClick={onSend}
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

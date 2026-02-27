import React, { useState, useRef, useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ChatUI = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  console.log(user?._id + "mkmkmkmk user");

  const [messages, setMessages] = useState([]);
  const [targetuser, setTargetuser] = useState({});
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  console.log("pppopoop");
  console.log(messages);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  const fetchToUser = async (targetUserId) => {
    const targetuser = await axios.get(BASE_URL + "/user/" + targetUserId, {
      withCredentials: true,
    });

    setTargetuser(targetuser);
  };
  useEffect(() => {
    fetchChatMessages();
    fetchToUser(targetUserId);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: userId,
      targetUserId,
      text: input,
    });
    // setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " send " + text);

      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="h-full flex justify-center bg-black">
      <div className="flex flex-col w-full max-w-4xl border-x border-gray-800 bg-neutral-900">
        {/* Chat Header (fixed inside container) */}
        <div className="h-16 flex-shrink-0 px-6 flex items-center border-b border-gray-800 bg-neutral-950">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {targetuser?.data?.targetUser?.firstName}{" "}
              {targetuser?.data?.targetUser?.lastName}
            </h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>

        {/* Scrollable Messages Only */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
        >
          {messages.map((Msg, index) => {
            return (
              <>
                <div
                  key={index}
                  className={
                    "chat " +
                    (user.firstName === Msg.firstName
                      ? "chat-end"
                      : "chat-start")
                  }
                >
                  <div className="chat-header">
                    {Msg.firstName}
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div className="chat-bubble">{Msg.text}</div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              </>
            );
          })}
        </div>

        {/* Chat Input (fixed inside container) */}
        <div className="h-20 flex-shrink-0 px-6 flex items-center border-t border-gray-800 bg-neutral-950">
          <div className="flex w-full items-center bg-neutral-800 border border-gray-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
            />

            <button
              onClick={handleSend}
              className="ml-3 p-2 rounded-full bg-white hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12l14-7-7 14-2-5-5-2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;

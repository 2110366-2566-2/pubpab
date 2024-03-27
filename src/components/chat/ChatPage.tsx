"use client";

import { useState } from "react";
import ChatArea from "./ChatArea/ChatArea";
import FriendChatList from "./FriendChatList/FriendChatList";

const ChatPage = () => {
  const [chatId, setChatId] = useState<string>("");

  // Function to update chat_id
  const handleChatIdChange = (newChatId: string) => {
    setChatId(newChatId);
  };
  return (
    <>
      <div style={{ flex: "30%", paddingRight: "1rem" }}>
        <p>FriendChatList</p>
        <FriendChatList onChatIdChange={handleChatIdChange} />
      </div>
      <div style={{ flex: "70%", paddingLeft: "1rem" }}>
        <p>ChatArea</p>
        <ChatArea chat_id={chatId} />
      </div>
    </>
  );
};

export default ChatPage;

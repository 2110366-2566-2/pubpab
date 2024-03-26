"use client";

import { useState } from "react";
import MessageArea from "./MessageArea";
import UserList from "./UserList";

const ChatPageInside = () => {
  const [chatId, setChatId] = useState<string>("");

  // Function to update chat_id
  const handleChatIdChange = (newChatId: string) => {
    setChatId(newChatId);
  };
  return (
    <>
      <div style={{ flex: "30%", paddingRight: "1rem" }}>
        <p>Userlist</p>
        <UserList onChatIdChange={handleChatIdChange} />
      </div>
      <div style={{ flex: "70%", paddingLeft: "1rem" }}>
        <p>MessageArea</p>
        <MessageArea chat_id={chatId} />
      </div>
    </>
  );
};

export default ChatPageInside;

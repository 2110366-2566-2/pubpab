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
  const chatpageStyle = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  };
  const friendChatListStyle = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    flex: "30%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };
  const chatAreaStyle = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    flex: "70%",
    paddingRight: "1rem",
  };
  return (
    <div className="Chatpage" style={chatpageStyle}>
      <div style={friendChatListStyle}>
        <p>FriendChatList</p>
        <FriendChatList onChatIdChange={handleChatIdChange} />
      </div>
      <div style={chatAreaStyle}>
        <p>ChatArea</p>
        <ChatArea chat_id={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;

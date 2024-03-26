import MessageArea from "@/components/chat/MessageArea";
import UserList from "@/components/chat/UserList";
import { useState } from "react";

export default async function ChatPage() {
  const [chatId, setChatId] = useState<string>("");

  // Function to update chat_id
  const handleChatIdChange = (newChatId: string) => {
    setChatId(newChatId);
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex" style={{ width: "100%" }}>
        <div style={{ flex: "30%", paddingRight: "1rem" }}>
          <UserList onChatIdChange={handleChatIdChange} />
        </div>
        <div style={{ flex: "70%", paddingLeft: "1rem" }}>
          <MessageArea chat_id={chatId} />
        </div>
      </div>
    </div>
  );
}

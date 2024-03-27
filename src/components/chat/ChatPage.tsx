"use client";

import { useEffect, useState } from "react";
import ChatArea from "./ChatArea/ChatArea";
import FriendChatList from "./FriendChatList/FriendChatList";
import { trpc } from "@/lib/trpc/client";
import LoadingScreen from "../ui/loading-screen";
import { useSession } from "next-auth/react";

const ChatPageMain = () => {
  const { data: session } = useSession();
  const [chatId, setChatId] = useState<string>("");
  const findChat = trpc.chat.chat.find;
  const createChat = trpc.chat.chat.create.useMutation();

  // Function to update chat_id
  const handleChatIdChange = (newChatId: string) => {
    setChatId(newChatId);
  };

  const queryParameters = new URLSearchParams(window.location.search);
  const host_id = queryParameters.get("host_id");

  const chatData = findChat.useQuery({
    host_id: host_id || "",
    traveler_id: session?.user?.id || "",
  });
  //console.log("host id: ", host_id);
  //console.log("traveler id: ", session?.user?.id);

  useEffect(() => {
    const fetchChat = async () => {
      if (chatData.data?.chatroom_id !== undefined) {
        console.log(chatData.data?.chatroom_id);
        setChatId(chatData.data?.chatroom_id || "");
      } else if (host_id !== null) {
        console.log("enter this instead");
        const newChat = await createChat.mutateAsync({
          host_id: host_id,
          traveler_id: session?.user?.id || "",
        });
        setChatId(newChat.chatroom_id);
      }
    };

    fetchChat();
  }, [findChat, createChat, host_id, session?.user?.id, chatId]);

  if (!session) {
    // Handle the case when session is not available
    return <LoadingScreen />;
  }

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
        <FriendChatList onChatIdChange={handleChatIdChange} />
      </div>
      <div style={chatAreaStyle}>
        <ChatArea chat_id={chatId} />
      </div>
    </div>
  );
};

export default ChatPageMain;

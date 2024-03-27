import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Message from "@/components/chat/ChatArea/MessageArea/Message";
import MyMessage from "./MyMessage";

const Messages = () => {
  return (
    <div className="messages" style={{ padding: "10px" }}>
      <Message />
      <Message />
      <MyMessage />
      <Message />
      <Message />
      {/* <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/> */}
    </div>
  );
};
export default Messages;

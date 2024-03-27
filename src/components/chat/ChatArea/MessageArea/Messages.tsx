import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Message from "@/components/chat/ChatArea/MessageArea/Message";

const Messages = () => {
  return (
    <div
      className="messages"
      style={{ backgroundColor: "whitesmoke", padding: "10px" }}
    >
      <Message />
      <Message />
      <Message />
    </div>
  );
};
export default Messages;

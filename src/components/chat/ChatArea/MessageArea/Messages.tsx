import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Message from "@/components/chat/ChatArea/MessageArea/Message";

const Messages = () => {
  return (
    <div className="messages">
      <Message />
      <Message />
      <Message />
    </div>
  );
};
export default Messages;

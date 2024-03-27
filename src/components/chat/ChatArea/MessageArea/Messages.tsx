import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Message from "@/components/chat/ChatArea/MessageArea/Message";
import MyMessage from "./MyMessage";

const Messages = ({ chat_id }: { chat_id: string }) => {
  let page_number = 0;
  const { data: session } = useSession();

  // if (chat_id === "") return null;

  const getMessages = trpc.chat.message.get.useQuery({
    chatroom_id: chat_id,
    page: page_number,
  });

  if (getMessages.error) {
    return <div>Error: {getMessages.error.message}</div>;
  }

  const messages = getMessages.data;
  const user = session?.user?.id;

  function isUserText(text: string, user_id: string) {
    if (user_id === user) {
      return <MyMessage text={text} />;
    } else {
      return <Message text={text} />;
    }
  }
  return (
    <div className="messages" style={{ padding: "10px" }}>
      {messages?.map((property, index) =>
        isUserText(property.text, property.sender_id),
      )}
      {/* <Message text={""} />
      <Message text={""} />
      <MyMessage text={""} />
      <Message text={""} />
      <Message text={""} /> */}
      {/* <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/> */}
    </div>
  );
};
export default Messages;

import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";

const MessageArea = ({ chat_id }: { chat_id: string }) => {
  let page_number = 0;
  const { data: session } = useSession();

  if (chat_id === "") return null;

  const getMessages = trpc.chat.message.get.useQuery({
    chatroom_id: chat_id,
    page: page_number,
  });

  if (getMessages.error) {
    return <div>Error: {getMessages.error.message}</div>;
  }

  if (getMessages.isLoading) {
    return <div>Loading...</div>;
  }

  const messages = getMessages.data;
  const user = session?.user?.id;

  const onInvalid = (errors: unknown) => console.error(errors);
  return (
    <div className="chats">
      <div className="userChat">
        {/* <img src=""/> */}
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;

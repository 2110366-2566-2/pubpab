import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Messages from "@/components/chat/ChatArea/MessageArea/Messages";
import InputBox from "@/components/chat/ChatArea/InputArea/InputBox";
import user1 from "@/../public/user1.jpg";
import Image from "next/image";

const ChatArea = ({ chat_id }: { chat_id: string }) => {
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

  // if (getMessages.isLoading) {
  //   return <div>Loading...</div>;
  // }

  const messages = getMessages.data;
  const user = session?.user?.id;

  const onInvalid = (errors: unknown) => console.error(errors);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <Image
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={user1}
            alt=""
          />
        </div>
      </div>
      <div className="chatArea">
        <Messages />
        <InputBox />
      </div>
    </div>
  );
};

export default ChatArea;

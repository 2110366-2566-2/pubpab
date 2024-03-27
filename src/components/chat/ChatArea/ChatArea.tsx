import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Messages from "@/components/chat/ChatArea/MessageArea/Messages";
import InputBox from "@/components/chat/ChatArea/InputArea/InputBox";
import Image from "next/image";
import Cam from "@/../public/img/cam.png";
import Add from "@/../public/img/add.png";
import More from "@/../public/img/more.png";

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

  const chatStyle = {
    flex: 2,
  };
  const chatInfoStyle = {
    display: "flex",
    height: "50px",
    color: "white",
    "background-color": "#5d5b5d",
    "align-items": "center",
    "justify-content": "space-between",
  };
  const chatIconsStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const onInvalid = (errors: unknown) => console.error(errors);
  return (
    <div className="chat" style={chatStyle}>
      <div className="chatInfo" style={chatInfoStyle}>
        <span>Jay Chanathip</span>
        <div className="chatIcons" style={chatIconsStyle}>
          <Image src={Cam} alt="" />
          <Image src={Add} alt="" />
          <Image src={More} alt="" />
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

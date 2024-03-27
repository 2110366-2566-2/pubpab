import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Messages from "@/components/chat/ChatArea/MessageArea/Messages";
import InputBox from "@/components/chat/ChatArea/InputArea/InputBox";
import Image from "next/image";
import Cam from "@/../public/img/cam.png";
import Add from "@/../public/img/add.png";
import More from "@/../public/img/more.png";

const ChatArea = ({ chat_id }: { chat_id: string }) => {
  const chatStyle = {
    display: "flex",
    flexDirection: "column",
    overflow: "visible",
    width: "100%",
  };
  const chatInfoStyle = {
    display: "flex",
    height: "50px",
    color: "white",
    paddingLeft: "4px",
    "background-color": "#5d5b5d",
    "align-items": "center",
    "justify-content": "space-between",
  };
  const chatIconsStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const chatAreaStyle = {
    display: "flex",
    flexDirection: "column",
    // height: 'calc(100% - 160px)',
    width: "100%",
    backgroundColor: "whitesmoke",
  };
  const inputAreaStyle = {
    display: "flex",
    // height: "50px",
    padding: "10px",
    // paddingTop: "10px",
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
      <div className="chatArea" style={chatAreaStyle}>
        <Messages chat_id={chat_id} />
      </div>
      <div className="inputArea" style={inputAreaStyle}>
        <InputBox />
      </div>
    </div>
  );
};

export default ChatArea;

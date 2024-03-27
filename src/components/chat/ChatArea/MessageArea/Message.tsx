import { useSession } from "next-auth/react";

const messageStyle = {
  color: "black",
  backgroundColor: "lightgray",
};

const Message = () => {
  return (
    <div className="message">
      <div className="messageContent" style={messageStyle}>
        <p>"Hello"</p>
      </div>
    </div>
  );
};

export default Message;

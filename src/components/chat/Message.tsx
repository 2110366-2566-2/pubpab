import { useSession } from "next-auth/react";

const Message = () => {
  return (
    <div className="message">
      <div className="messageContent">
        <p>"Hello"</p>
      </div>
    </div>
  );
};

export default Message;

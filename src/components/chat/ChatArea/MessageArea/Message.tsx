import user2 from "@/../public/user2.jpg";
import Image from "next/image";

const messageStyle = {
  display: "flex",
};
const messageInfoStyle = {
  gap: "20px",
};
const messageContentStyle = {};

const Message = () => {
  return (
    <div className="message" style={messageStyle}>
      <div className="messageInfoContent" style={messageInfoStyle}>
        <Image
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={user2}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent" style={messageContentStyle}>
        <p>I want to be transfered to Burirum</p>
      </div>
    </div>
  );
};

export default Message;

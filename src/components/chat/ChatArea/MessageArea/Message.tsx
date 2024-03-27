import user2 from "@/../public/user2.jpg";
import Image from "next/image";

const messageStyle = {
  display: "flex",
};
const messageInfoStyle = {
  gap: "20px",
  flexDirection: "column",
  color: "gray",
  marginBottom: "15px",
};
const messageContentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "35px",
  backgroundColor: "white",
  borderRadius: "0px 10px 10px 10px",
  paddingTop: "5px",
  paddingBottom: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const Message = ({ text }: { text: string }) => {
  return (
    <div className="message" style={messageStyle}>
      <div className="messageInfoContent" style={messageInfoStyle}>
        <Image
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={user2}
          alt=""
        />
        {/* <span style={{ fontSize: "10px" }}>just now</span> */}
      </div>
      <div className="messageContent" style={messageContentStyle}>
        <p>I want to be transfered to Burirum</p>
      </div>
    </div>
  );
};

export default Message;

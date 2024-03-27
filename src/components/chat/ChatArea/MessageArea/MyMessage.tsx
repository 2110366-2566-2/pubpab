import user3 from "@/../public/user3.jpg";
import Image from "next/image";

const messageStyle = {
  display: "flex",
  flexDirection: "row-reverse",
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
  height: "35px",
  backgroundColor: "green",
  borderRadius: "10px 0px 10px 10px",
  paddingTop: "5px",
  paddingBottom: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const MyMessage = () => {
  return (
    <div className="message" style={messageStyle}>
      <div className="messageInfoContent" style={messageInfoStyle}>
        <Image
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={user3}
          alt=""
        />
        <span style={{ fontSize: "10px" }}>just now</span>
      </div>
      <div className="messageContent" style={messageContentStyle}>
        <p>How was the game?</p>
      </div>
    </div>
  );
};

export default MyMessage;

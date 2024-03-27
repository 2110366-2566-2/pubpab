import ChatPage from "@/components/chat/ChatPage";

export default async function ChatPage2() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex" style={{ width: "100%" }}>
        <ChatPage />
      </div>
    </div>
  );
}

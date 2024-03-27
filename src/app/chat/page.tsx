import ChatPageMain from "@/components/chat/ChatPage";

export default async function ChatPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex" style={{ width: "100%" }}>
        <ChatPageMain />
      </div>
    </div>
  );
}

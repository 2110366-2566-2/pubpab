import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";

type OnChatIdChange = (chatId: string) => void;

interface UserListProps {
  onChatIdChange: OnChatIdChange;
}

const UserList = ({ onChatIdChange }: UserListProps) => {
  const { data: session } = useSession();
  const isHost = session?.user?.role === "Hosts" ? true : false;
  const getAllChatroom = trpc.chat.chat.get.useQuery({
    host_id: isHost ? session?.user?.id : undefined,
    traveler_id: isHost ? undefined : session?.user?.id,
  });
  const getChatRoom = trpc.chat.chat.find.useQuery({
    host_id: isHost ? session?.user?.id : "",
    traveler_id: isHost ? "" : session?.user?.id,
  });

  const handleUserClick = (chatId: string) => {
    onChatIdChange(chatId);
  };
  return;
  <div>
    <div className="chats">
      <div className="userChat">
        <p>Hi</p>
      </div>
    </div>
  </div>;
};

export default UserList;

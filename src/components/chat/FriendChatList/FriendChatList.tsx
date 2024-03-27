import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import FriendChatProfile from "@/components/chat/FriendChatList/FriendChatProfile";
import FriendChatProfileClicked from "@/components/chat/FriendChatList/FriendChatProfileClicked";
import { useState } from "react";

type OnChatIdChange = (chatId: string) => void;

interface UserListProps {
  onChatIdChange: OnChatIdChange;
}

const UserList = ({ onChatIdChange }: UserListProps) => {
  const { data: session } = useSession();
  const isHost = session?.user?.role.toString() === "Hosts" ? true : false;
  const getAllChatroom = trpc.chat.chat.get.useQuery({
    host_id: isHost ? session?.user?.id : undefined,
    traveler_id: isHost ? undefined : session?.user?.id,
  });
  const getChatRoom = trpc.chat.chat.find;

  const allChatRoom = getAllChatroom.data;

  const handleUserClick = (host_id: string, traveler_id: string) => {
    const chatId = getChatRoom.useQuery({
      host_id: host_id,
      traveler_id: traveler_id,
    });
    onChatIdChange(chatId.data?.chatroom_id || "");
  };

  return (
    <div>
      <div className="chats">
        <div className="userChat">
          <ul role="list" className="divide-y divide-gray-100">
            {allChatRoom?.map((property, index) => (
              <div
                onClick={() =>
                  handleUserClick(property.host_id, property.traveler_id)
                }
              >
                <FriendChatProfile />
              </div>
            ))}
            {/* <FriendChatProfile />
            <FriendChatProfileClicked />
            <FriendChatProfile />
            <FriendChatProfile />
            <FriendChatProfile /> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;

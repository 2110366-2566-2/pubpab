import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import user1 from "@/../public/user1.jpg";

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
  return (
    <div>
      <div className="chats">
        <div className="userChat">
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={user1}
                  alt=""
                ></Image>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Leslie Alexander
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    leslie.alexander@example.com
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Co-Founder / CEO
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
                </p>
              </div>
            </li>
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={user1}
                  alt=""
                ></Image>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Michael Foster
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    michael.foster@example.com
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Co-Founder / CTO
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;

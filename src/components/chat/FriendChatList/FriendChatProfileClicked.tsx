import user2 from "@/../public/user2.jpg";
import Image from "next/image";

const UserChatClicked = () => {
  return (
    <li className="flex justify-between gap-x-6 bg-gray-100 py-5">
      <div className="flex min-w-0 gap-x-4">
        <Image
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={user2}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Jay Chanathip
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            I want to be transfered to Burirum.
          </p>
        </div>
      </div>
    </li>
  );
};
export default UserChatClicked;

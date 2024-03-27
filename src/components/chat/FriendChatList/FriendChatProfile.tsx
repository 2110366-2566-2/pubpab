import user1 from "@/../public/user1.jpg";
import Image from "next/image";

const User = () => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <Image
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={user1}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Son Heung-min
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            Yesterday match was very fun.
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 px-4 py-4 sm:flex sm:flex-col sm:items-end">
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
          12
        </span>
      </div>
    </li>
  );
};
export default User;

import Image from "next/image"; // Import Image component for the logo
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import ProfileButton from "./ProfileButton";
import SigninButton from "./SigninButton";

const Navbar = () => {
  return (
    <nav className="h-15 sticky top-0 z-50 mb-8 flex w-full items-center justify-between bg-[#f4edea] py-2">
      <div className="pl-4">
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            <Image src="/Logo.png" width={150} height={40} alt="logo" />
          </Link>
          <Link
            className="text-gray-800 transition-colors hover:text-sky-400"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="text-gray-800 transition-colors hover:text-sky-400"
            href={"/extra"}
          >
            User Profile
          </Link>
          <Link
            className="text-gray-800 transition-colors hover:text-sky-400"
            href={"/admin"}
          >
            Admin Dashboard
          </Link>
          <Link
            className="text-gray-800 transition-colors hover:text-sky-400"
            href={"/editDetails/edit/host"}
          >
            Host Profile
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5 flex cursor-pointer items-center">
          <Image
            src="/Notification.svg"
            width={40}
            height={40}
            alt="notification"
          />
        </div>
        <div className="mr-5 flex cursor-pointer items-center">
          <Image src="/Order.svg" width={40} height={40} alt="order" />
        </div>
        <div className="mr-5 flex cursor-pointer items-center">
          <Popover>
            <PopoverTrigger asChild className="">
              <button className="IconButton">
                <Image src="/user.svg" width={40} height={40} alt="user" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="z-[10000] w-auto p-0">
              <div className="flex flex-col gap-0">
                <ProfileButton />
                <SigninButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* <SigninButton /> */}
      </div>
    </nav>
  );
};

export default Navbar;

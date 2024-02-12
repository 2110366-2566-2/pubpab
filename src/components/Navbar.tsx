import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component for the logo
import SigninButton from "./SigninButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#F4EDEA] p-0 shadow">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="flex-shrink-0">
            <Image src="/Logo.png" width={150} height={40} alt="logo" />
          </div>
        </Link>
        <div className="flex items-center">
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
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5 cursor-pointer">
          <Image src="/Notification.svg" width={40} height={40} alt="notification" />
        </div>
        <div className="mr-0 cursor-pointer">
          <Image src="/Order.svg" width={40} height={40} alt="order" />
        </div>
        <Link href="/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignin">
          <div className="mr-5 cursor-pointer">
            <Image src="/user.svg" width={40} height={40} alt="user" />
          </div>
        </Link>
        {/* <SigninButton /> */}
      </div>
    </nav>
  );
};


export default Navbar;

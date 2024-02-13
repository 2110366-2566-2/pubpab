import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component for the logo
import SigninButton from "./SigninButton";

const Navbar = () => {
  return (
    <div className="bg-f4edea text-black">
      <nav className="h-30 bg-f4edea fixed top-0 z-50 flex w-full items-center justify-between py-0">
        <Link href="/">
          <div className="pl-4">
            <div className="flex items-center space-x-4">
              <Image src="/Logo.png" width={150} height={40} alt="logo" />
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
        </Link>
        <div className="mr-5 flex items-center space-x-4">
          <Image src="/user.png" width={40} height={40} alt="user" />
          <SigninButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

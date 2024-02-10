import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component for the logo
import SigninButton from "./SigninButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        {" "}
        <Link href="/">
          <div className="flex-shrink-0">
            {" "}
            {/* <Image src="/logo.jpeg" width={200} height={60} alt="logo" /> */}
            <img src="/Logo.svg" width={200} height={60} alt="logo" />
          </div>
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
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <img src="/user.svg" width={40} height={40} alt="user" />
        </div>
        <SigninButton />
      </div>
    </nav>
  );
};

export default Navbar;

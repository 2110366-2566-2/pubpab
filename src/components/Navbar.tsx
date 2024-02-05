import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component for the logo
import SigninButton from "./SigninButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        {" "}
        {/* Container for logo and links */}
        <Link href="/">
          <div className="flex-shrink-0">
            {" "}
            {/* Container for the logo */}
            <Image src="/logo.jpeg" width={200} height={60} alt="logo" />
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
      <SigninButton />
    </nav>
  );
};

export default Navbar;

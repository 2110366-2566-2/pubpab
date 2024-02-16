import Link from "next/link";

import SigninButton from "./SigninButton";

const Appbar = () => {
  return (
    <header className="flex gap-4 bg-gradient-to-b from-white to-gray-200 p-4 shadow ">
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

      <SigninButton />
    </header>
  );
};

export default Appbar;

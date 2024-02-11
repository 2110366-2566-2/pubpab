
"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="ml-auto flex items-center gap-4">
        <p className="text-sky-600">{session.user.name}</p>
        <Image
          src={session.user.image ?? ""}
          alt={session.user.name ?? ""}
          className="rounded-full"
          width={32}
          height={32}
        />
        <button
          onClick={() => signOut()}
          className="text-black hover:text-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="ml-auto text-black hover:text-sky-400"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
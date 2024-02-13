"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button, buttonVariants } from "../components/ui/button";

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
        <Button
          variant={"ghost"}
          onClick={() => signOut()}
          className="text-black hover:text-red-600"
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <Button
      variant={"ghost"}
      onClick={() => signIn()}
      className="ml-auto text-black hover:text-sky-400"
    >
      Sign In
    </Button>
  );
};

export default SigninButton;

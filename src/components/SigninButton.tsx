"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button, buttonVariants } from "../components/ui/button";
import { useRouter } from "next/navigation";

const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/"); // Navigate to the homepage
    await signOut();
  };

  if (session && session.user) {
    return (
      <Button
        variant={"ghost"}
        onClick={() => handleSignOut()}
        className="text-black hover:text-red-600"
      >
        Sign Out
      </Button>
    );
  }
  return (
    <Button
      variant={"ghost"}
      onClick={() => signIn()}
      className="text-black hover:text-sky-400"
    >
      Sign In
    </Button>
  );
};

export default SigninButton;

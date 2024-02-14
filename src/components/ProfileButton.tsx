"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button, buttonVariants } from "../components/ui/button";
import Link from "next/link";

const ProfileButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    if (session.user.role == "Hosts") {
      return (
        <div className="flex flex-col items-center">
          <p className="m-2 text-center text-lg font-bold">
            {session.user.name}
          </p>
          <Link href="/edit/host">
            <Button
              variant={"ghost"}
              className="text-black hover:text-blue-600"
            >
              Profile
            </Button>
          </Link>
        </div>
      );
    } else if (session.user.role == "Travelers") {
      return (
        <div className="flex flex-col items-center">
          <p className="m-2 text-center text-lg font-bold">
            {session.user.name}
          </p>
          <Link href="/edit/traveler">
            <Button
              variant={"ghost"}
              className="text-black hover:text-blue-600"
            >
              Profile
            </Button>
          </Link>
        </div>
      );
    }
  }
  return (
    <Link href="/register">
      <Button variant={"ghost"} className="text-black hover:text-green-400">
        Register
      </Button>
    </Link>
  );
};

export default ProfileButton;

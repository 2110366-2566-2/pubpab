"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "../components/ui/button";

const ProfileButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleTravelerClick = async () => {
    await router.push("/edit/traveler");
    // setTimeout(() => location.reload(), 500);
  };

  const handleHostClick = async () => {
    await router.push("/edit/host");
    // setTimeout(() => location.reload(), 500);
  };
  if (session && session.user) {
    if (session.user.role == "Hosts") {
      return (
        <div className="flex flex-col items-center">
          <p className="m-2 text-center text-lg font-bold">
            {session.user.name}
          </p>
          {/* <Link href="edit/host"> */}
          <Button
            variant={"ghost"}
            className="text-black hover:text-blue-600"
            onClick={handleHostClick}
          >
            Profile
          </Button>
          {/* </Link> */}
        </div>
      );
    } else if (session.user.role == "Travelers") {
      return (
        <div className="flex flex-col items-center">
          <p className="m-2 text-center text-lg font-bold">
            {session.user.name}
          </p>
          {/* <Link href="edit/traveler"> */}
          <Button
            variant={"ghost"}
            className="text-black hover:text-blue-600"
            onClick={handleTravelerClick}
          >
            Profile
          </Button>
          {/* </Link> */}
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

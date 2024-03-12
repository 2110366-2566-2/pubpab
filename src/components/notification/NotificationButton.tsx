"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

const Notification_Button = () => {
  // const router = useRouter();
  const { data: session } = useSession();

  // const handleHostNotificationClick = async () => {
  //     router.push("/notifications/host");
  // };

  // const handleTravelerNotificationClick = async () => {
  //     router.push("/notifications/traveler");
  // };

  if (session && session.user) {
    if (session.user.role == "Hosts") {
      return (
        <Link href={"/notifications/host"}>
          <Button
            variant={"link"}
            // onClick={handleHostNotificationClick}
          ></Button>
        </Link>
      );
    } else if (session.user.role == "Travelers") {
      return (
        <Link href={"/notifications/traveler"}>
          <Button
            variant={"link"}
            // onClick={handleTravelerNotificationClick}
          ></Button>
        </Link>
      );
    }
  }

  return null;
};

export default Notification_Button;

"use client";

import Image from "next/image"; // Import Image component for the logo
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import Notification_Button from "./notification/NotificationButton";
import ProfileButton from "./ProfileButton";
import SigninButton from "./SigninButton";

const Navbar = () => {
  const { data: session } = useSession();
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [bookingClicked, setBookingClicked] = useState(false);

  const handleIconClick = () => {
    setNotificationClicked(false);
    setBookingClicked(false);
  };

  const handleNotificationClick = () => {
    setNotificationClicked(true);
    setBookingClicked(false);
  };

  const handleBookingClick = () => {
    setBookingClicked(true);
    setNotificationClicked(false);
  };

  return (
    <nav className="h-15 sticky top-0 z-50 mb-8 flex w-full items-center justify-between bg-[#f4edea] py-2">
      <div className="pl-4">
        <div className="flex items-center space-x-4" onClick={handleIconClick}>
          <Link className="pr-8" href={"/"}>
            <Image src="/Logo.png" width={150} height={40} alt="logo" />
          </Link>
          <Link
            className="pr-8 text-gray-800 transition-colors hover:text-sky-400"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="pr-8 text-gray-800 transition-colors hover:text-sky-400"
            href={"/searchprop"}
          >
            Search
          </Link>
          <Link
            className="pr-8 text-gray-800 transition-colors hover:text-sky-400"
            href={"/chat"}
          >
            Chat
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative mr-12 mt-1 flex items-center">
          <div className="relative" onClick={handleNotificationClick}>
            {session && session.user && (
              <>
                <Image
                  src={
                    notificationClicked
                      ? "/notification_toggle.svg"
                      : "/notification2.svg"
                  }
                  width={37}
                  height={37}
                  alt="notification"
                />
                <button className="absolute left-0 top-0 h-0 w-0 cursor-pointer ">
                  <Notification_Button />
                </button>
              </>
            )}
            {!session && (
              <Image
                src="/notification2.svg"
                width={37}
                height={37}
                alt="notification"
              />
            )}
          </div>
        </div>
        <div
          className="mr-12 flex cursor-pointer items-center"
          onClick={handleBookingClick}
        >
          {session && session.user && session.user.role === "Hosts" && (
            <Link href={"/booking/host/"}>
              <Image
                src={bookingClicked ? "/booking_toggle.svg" : "/booking.svg"}
                width={37}
                height={37}
                alt="booking"
              />
            </Link>
          )}
          {session && session.user && session.user.role === "Travelers" && (
            <Link href={"/booking/traveler/"}>
              <Image
                src={bookingClicked ? "/booking_toggle.svg" : "/booking.svg"}
                width={37}
                height={37}
                alt="booking"
              />
            </Link>
          )}
          {!session && (
            <Image src="/booking.svg" width={37} height={37} alt="booking" />
          )}
        </div>
        <div className="mr-7 mt-1.5 flex cursor-pointer items-center">
          <Popover>
            <PopoverTrigger asChild className="">
              <button className="IconButton">
                <Image src="/user.svg" width={40} height={40} alt="user" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="z-[10000] w-auto p-0">
              <div className="flex flex-col gap-0" onClick={handleIconClick}>
                <ProfileButton />
                <SigninButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

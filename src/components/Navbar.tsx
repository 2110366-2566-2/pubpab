"use client";

import Image from "next/image"; // Import Image component for the logo
import Link from "next/link";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import ProfileButton from "./ProfileButton";
import SigninButton from "./SigninButton";

const Navbar = () => {
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
            href={"/"}
          >
            Search
          </Link>
          <Link
            className="pr-8 text-gray-800 transition-colors hover:text-sky-400"
            href={"/"}
          >
            Chat
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="mr-12 mt-1 flex cursor-pointer items-center"
          onClick={handleNotificationClick}
        >
          <Link href={"/notifications/host/"}>
            {notificationClicked ? (
              <Image
                src="/notification_toggle.svg"
                width={40}
                height={40}
                alt="notification"
              />
            ) : (
              <Image
                src="/notification2.svg"
                width={40}
                height={40}
                alt="notification"
              />
            )}
          </Link>
          {/* เหลือเช็คว่า เป็น host หรือ traveler ก็ไปหน้า notification นั้นๆ
          <Link href={"/notifications/traveler/"}>
            {notificationClicked ? (
              <Image src="/notification_toggle.svg" width={40} height={40} alt="notification" />
            ) : (
              <Image src="/notification2.svg" width={40} height={40} alt="notification" />
            )}
          </Link> */}
        </div>
        <div
          className="mr-12 flex cursor-pointer items-center"
          onClick={handleBookingClick}
        >
          <Link href={"/booking/host/"}>
            {bookingClicked ? (
              <Image
                src="/booking_toggle.svg"
                width={40}
                height={40}
                alt="booking"
              />
            ) : (
              <Image src="/booking.svg" width={40} height={40} alt="booking" />
            )}
          </Link>
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
        {/* <SigninButton /> */}
      </div>
    </nav>
  );
};

export default Navbar;

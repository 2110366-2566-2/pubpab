import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const PropertyRoomCard = () => {
  return (
    <div className="px-4 pb-4">
      <div>
        <label className="text-2xl">Rooms</label>
      </div>
      <div className="flex">
        <div className="relative">
          <Image
            src="/room1.jpeg"
            alt="Room 1"
            width={240}
            height={180}
            className="mr-2"
          />
          <span className="absolute right-2 top-0 bg-green-500 p-1 text-xs text-white">
            Available
          </span>
        </div>
        <div className="relative">
          <Image
            src="/room2.jpeg"
            alt="Room 2"
            width={240}
            height={180}
            className="mr-2"
          />
          <span className="absolute right-2 top-0 bg-red-500 p-1 text-xs text-white">
            Unavailable
          </span>
        </div>
        <div className="relative">
          <Image
            src="/room3.jpeg"
            alt="Room 3"
            width={240}
            height={80}
            className="mr-2"
          />
          <span className="absolute right-2 top-0 bg-green-500 p-1 text-xs text-white">
            Available
          </span>
        </div>
      </div>
      <Button
        type="submit"
        className="text-grey-800 mt-10 w-40 border border-black bg-[#F4EDEA] hover:text-white"
      >
        Save changes
      </Button>
    </div>
  );
};
export default PropertyRoomCard;

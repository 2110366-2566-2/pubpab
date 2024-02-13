import React from "react";

const VerifyRoomCard = () => {
  return (
    <div className="px-4 pb-4">
      <div>
        <label className="text-2xl">Rooms</label>
      </div>
      <div className="flex">
        <div className="relative">
          <img src="/room1.jpeg" alt="Room 1" className="mr-2 h-60 w-80" />
          <span className="absolute right-2 top-0 bg-green-500 p-1 text-xs text-white">
            Verify
          </span>
        </div>
        <div className="relative">
          <img src="/room2.jpeg" alt="Room 2" className="mr-2 h-60 w-80" />
          <span className="absolute right-2 top-0 bg-red-500 p-1 text-xs text-white">
            Not Verify
          </span>
        </div>
        <div className="relative">
          <img src="/room3.jpeg" alt="Room 3" className="mr-2 h-60 w-80 " />
          <span className="absolute right-2 top-0 bg-green-500 p-1 text-xs text-white">
            Verify
          </span>
        </div>
      </div>
    </div>
  );
};
export default VerifyRoomCard;

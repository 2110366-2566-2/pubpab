import Image from "next/image";
import Link from "next/link";
import { LogInIcon, LogOutIcon, StarIcon, CheckIcon } from "lucide-react";
import RoomInfoCard from "@/components/card/RoomInfoCard";

import EastHotelImage from "@/../../public/easthotel.jpeg";

const PropInfo = async () => {
  const Info = [
    {
      accomName: "Your mom",
      roomName: "Mom's Room",
      price: 100,
      floor: 69,
      room: 69,
      bed: "mom",
      adult: 1,
      children: 69,
    },
    {
      accomName: "Your dad",
      roomName: "Dad's Room",
      price: 100,
      floor: 1,
      room: 1,
      bed: "dad",
      adult: 1,
      children: 1,
    },
  ];

  return (
    <>
      <header className="flex h-20 w-full flex-row items-center justify-center bg-blue-900">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <LogInIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            23 Feb 2024
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <LogOutIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            24 Feb 2024
          </button>
        </span>
      </header>
      <section className="mx-auto max-w-7xl px-4">
        <div className="flex w-full items-center justify-between py-4">
          <a href="/searchprop">
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Back
            </button>
          </a>
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-green-600/20">
            <StarIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            4.9
          </span>
        </div>
        <div className="w-full overflow-hidden rounded-lg border-2 border-gray-100 bg-white shadow">
          <Image src={EastHotelImage} alt="" className="h-64 object-cover" />
          <div className="flex flex-row gap-8 px-8 pb-4 pt-8">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Name</h2>
              <p className="text-base font-normal text-gray-900">Location</p>
              <div className="mt-4">
                <span className="flex min-h-60 flex-col rounded-xl border border-blue-300 p-2 px-4 text-blue-300">
                  <h1>Description:</h1>
                  <p>your mom</p>
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-row items-center justify-center rounded-lg bg-blue-900 text-center">
                <p className="text-base font-semibold text-white">Google Map</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-8 py-4">
            <h2 className="text-xl font-bold text-gray-900">Rooms</h2>
            {Info.map((items) => (
              <RoomInfoCard
                accomName={items.accomName}
                roomName={items.roomName}
                price={items.price}
                floor={items.floor}
                room={items.room}
                bed={items.bed}
                adult={items.adult}
                children={items.children}
                id={"your id"}
              />
            ))}
            {/* <PropertyInfoCard accomName="mom" roomName="mom" price={100} floor={1} room={1} bed="mom" adult={1} children={1} /> */}
          </div>
        </div>
      </section>
    </>
  );
};
export default PropInfo;

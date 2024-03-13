"use client";

import Image from "next/image";
import Link from "next/link";
import { LogInIcon, LogOutIcon, StarIcon, CheckIcon } from "lucide-react";
import RoomInfoCard from "@/components/card/RoomInfoCard";

import EastHotelImage from "@/../../public/easthotel.jpeg";
import { trpc } from "@/lib/trpc/client";

const PropInfo = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const accom_id = queryParameters.get("accom_id");

  const findAccommodation = trpc.host.accomodation.findUnique.useQuery({
    accommodation_id: accom_id ? accom_id : "",
  });
  // const Info = [
  //   {
  //     accomName: "Your mom",
  //     roomName: "Mom's Room",
  //     price: 100,
  //     floor: 69,
  //     room: 69,
  //     bed: "mom",
  //     adult: 1,
  //     children: 69,
  //   },
  //   {
  //     accomName: "Your dad",
  //     roomName: "Dad's Room",
  //     price: 100,
  //     floor: 1,
  //     room: 1,
  //     bed: "dad",
  //     adult: 1,
  //     children: 1,
  //   },
  // ];

  const findRooms = trpc.host.room.findMany.useQuery({
    accommodation_id: accom_id || "",
  });

  if (findRooms.error) {
    return <div>Error: {findRooms.error.message}</div>;
  }

  if (findAccommodation.error) {
    return <div>Error: {findAccommodation.error.message}</div>;
  }

  if (findRooms.isLoading || findAccommodation.isLoading) {
    return <div>Loading...</div>;
  }

  const roomsData = findRooms.data;
  const accomData = findAccommodation.data;
  const Info = roomsData.flatMap((entry) =>
    entry.room.map((room) => ({
      accomName: accomData.name_a,
      roomName: room.room_name,
      price: room.price,
      room: room.room_no,
      floor: room.floor,
      bed: room.bed_type,
      adult: room.max_adult,
      children: room.max_children,
    })),
  );

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
              <h2 className="text-xl font-bold text-gray-900">
                Name: {accomData.name_a}
              </h2>
              <p className="text-base font-normal text-gray-900">
                Location: {accomData.address_a} {accomData.distinct_a}{" "}
                {accomData.city} {accomData.province} {accomData.postal_code}
              </p>
              <div className="mt-4">
                <span className="flex min-h-60 flex-col rounded-xl border border-blue-300 p-2 px-4 text-blue-300">
                  <h1>Description:</h1>
                  <p>{accomData.description_a}</p>
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
            {Info.flatMap(
              (items: {
                accomName: string | null;
                roomName: string | null;
                price: number | null;
                floor: number | null;
                room: string | null;
                bed: string | null;
                adult: number | null;
                children: number | null;
              }) => (
                <RoomInfoCard
                  accomName={items.accomName ? items.accomName : ""}
                  roomName={items.roomName ? items.roomName : ""}
                  price={items.price ? items.price : 0}
                  floor={items.floor ? items.floor : 1}
                  room={items.room ? items.room : ""}
                  bed={items.bed ? items.bed : ""}
                  adult={items.adult ? items.adult : 0}
                  children={items.children ? items.children : 0}
                  id={"your id"}
                />
              ),
            )}
            {/* <PropertyInfoCard accomName="mom" roomName="mom" price={100} floor={1} room={1} bed="mom" adult={1} children={1} /> */}
          </div>
        </div>
      </section>
    </>
  );
};
export default PropInfo;

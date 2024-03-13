"use client";

import ReserveBookingCard from "@/components/reserve/reserve";
import { trpc } from "@/lib/trpc/client";
import LoadingScreen from "@/components/ui/loading-screen";

export default function ReserveRoom() {
  const queryParameters = new URLSearchParams(window.location.search);
  const accom_id = queryParameters.get("accom_id");
  const room_id = queryParameters.get("room_id");
  const CheckInDate = queryParameters.get("checkInDate");
  const CheckOutDate = queryParameters.get("checkOutDate");

  const findRoom = trpc.host.room.find.useQuery({
    room_id: room_id ? room_id : "",
  });

  const findAccom = trpc.host.accomodation.findUnique.useQuery({
    accommodation_id: accom_id ? accom_id : "",
  });

  if (findRoom.error) {
    return <div>Error: {findRoom.error.message}</div>;
  }

  if (findAccom.error) {
    return <div>Error: {findAccom.error.message}</div>;
  }

  if (findRoom.isLoading || findAccom.isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  const roomData = findRoom.data;
  const accomData = findAccom.data;

  const location =
    accomData.address_a +
    " " +
    accomData.distinct_a +
    " " +
    accomData.city +
    " " +
    accomData.province +
    " " +
    accomData.postal_code;
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back
        </button>
        <div className="flex w-full flex-col gap-4">
          <ReserveBookingCard
            accomName={accomData.name_a}
            roomName={roomData.room_name}
            price={roomData.price}
            location={location}
            // adult="2"
            // child="1"
            // user="John Doe"
            checkInDate={CheckInDate || ""}
            checkOutDate={CheckOutDate || ""}
            room_id={room_id || ""}
            host_id={accomData.host_id || ""}
          />
        </div>
      </div>
    </div>
  );
}

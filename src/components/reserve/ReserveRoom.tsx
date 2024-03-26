"use client";

import ReserveBookingCard from "@/components/reserve/reserve";
import { trpc } from "@/lib/trpc/client";
import LoadingScreen from "@/components/ui/loading-screen";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ReserveRoom() {
  const router = useRouter();
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

  const handleBackClick = () => {
    router.back();
  };

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
        <Button
          onClick={handleBackClick}
          type="button"
          className="text-grey-800 mt-15 mb-4 w-40 border border-black bg-[#F4EDEA] hover:text-white"
        >
          Back
        </Button>
        <div className="flex w-full flex-col gap-4">
          <ReserveBookingCard
            accom_id={accom_id || ""}
            accomName={accomData.name_a}
            accom_banner={accomData.banner || ""}
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
            accom_id={accom_id || ""}
          />
        </div>
      </div>
    </div>
  );
}

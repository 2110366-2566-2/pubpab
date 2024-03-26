"use client";
import { trpc } from "@/lib/trpc/client";
import WriteReviewCard from "@/components/review/writeReview";
import bellagio from "@/../public/Bellagio.webp";
import { useState } from "react";
import LoadingScreen from "@/components/ui/loading-screen";

export default function WriteReviewCardPage() {
  // need to send query parameter
  const queryParameters = new URLSearchParams(window.location.search);
  const reservation_id = queryParameters.get("reservation_id");
  const accom_id = queryParameters.get("accom_id");
  const traveler_id = queryParameters.get("traveler_id");
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const reserveRoom = trpc.traveler.reservation.getRoom.useQuery({
    reservation_id: reservation_id || "",
  });

  if (reserveRoom.error) {
    return <div>Error: {reserveRoom.error.message}</div>;
  }
  if (reserveRoom.isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  const roomData = reserveRoom.data;

  if (!roomData) {
    return <div>Error: </div>;
  }
  return (
    <div className="flex justify-center">
      <WriteReviewCard
        reservationId={reservation_id || ""}
        accommodationId={accom_id || ""}
        userId={traveler_id || ""}
        accommodationName={roomData.room.accommodation?.name_a || ""}
        roomName={roomData.room.room_name || ""}
        location={roomData.room.accommodation?.address_a || ""}
        imageURL={bellagio}
        rating={rating}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
}

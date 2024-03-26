"use client";

import WriteReviewCard from "@/components/review/writeReview";
import bellagio from "@/../public/Bellagio.webp";
import { useState } from "react";

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

  return (
    <div className="flex justify-center">
      <WriteReviewCard
        reservationId={reservation_id || ""}
        accommodationId={accom_id || ""}
        userId={traveler_id || ""}
        accommodationName="Loli Hotel"
        roomName="Loli Suite"
        location="1000 Bangkok Christian, Kiraragz"
        imageURL={bellagio}
        rating={rating}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
}

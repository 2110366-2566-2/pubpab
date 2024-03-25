import WriteReviewCard from "@/components/review/writeReview";
import bellagio from "@/../public/Bellagio.webp";

export default function WriteReviewCardPage() {
  // need to send query parameter
  const queryParameters = new URLSearchParams(window.location.search);
  const reservation_id = queryParameters.get("reservation_id");
  const accom_id = queryParameters.get("accom_id");
  const traveler_id = queryParameters.get("traveler_id");

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
        rating={3}
      />
    </div>
  );
}

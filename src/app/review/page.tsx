import WriteReviewCard from "@/components/review/writeReview";
import bellagio from "@/../public/Bellagio.webp";

export default function WriteReviewCardPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const accom_id = queryParameters.get("accom_id");
  const traveler_id = queryParameters.get("traveler_id");

  return (
    <div className="flex justify-center">
      <WriteReviewCard
        accommodationName="Loli Hotel"
        roomName="Loli Suite"
        location="1000 Bangkok Christian, Kiraragz"
        imageURL={bellagio}
        rating={3}
      />
    </div>
  );
}

import WriteReviewCard from "@/components/review/writeReview";
import bellagio from "@/../public/Bellagio.webp";

export default function WriteReviewCardPage() {
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

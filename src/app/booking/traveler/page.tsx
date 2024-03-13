import TravelerBookings from "@/components/booking/books/TravelerBookings";

export default function Traveler_Booking() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">
          Your accommodation booking
        </h1>
        <div className="flex w-full flex-col gap-4">
          <TravelerBookings />
        </div>
      </div>
    </div>
  );
}

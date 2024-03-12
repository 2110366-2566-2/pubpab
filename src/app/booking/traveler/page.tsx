import TravelerBookingCard from "@/components/booking/traveler/traveler_booking";

export default function Traveler_Booking() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">
          Your accommodation booking
        </h1>
        <div className="flex w-full flex-col gap-4">
          <TravelerBookingCard
            accomName="The Base"
            roomName="Room 1"
            price="100"
            adult="2"
            child="1"
            checkInDate="2024/02/17"
            checkOutDate="2024/02/19"
          />
        </div>
      </div>
    </div>
  );
}

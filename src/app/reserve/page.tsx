import ReserveBookingCard from "@/components/reserve/reserve";

export default function Host_Booking() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back
        </button>
        {/* <h1 className="mb-4 w-full text-3xl font-semibold">Reserved Room</h1> */}
        <div className="flex w-full flex-col gap-4">
          <ReserveBookingCard
            accomName="Siam Kempinski Hotel Bangkok"
            roomName="Presidential Suite room"
            price="1,380"
            location="Bangkok"
            // adult="2"
            // child="1"
            // user="John Doe"
            checkInDate="2024/02/17"
            checkOutDate="2024/02/19"
          />
        </div>
      </div>
    </div>
  );
}

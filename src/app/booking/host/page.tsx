import HostBookingCard from "@/components/booking/host/host_booking";

export default function Host_Booking() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">Reserved Room</h1>
        <div className="flex w-full flex-col gap-4">
          <HostBookingCard
            accomName="The Base"
            roomName="Room 1"
            price="100"
            adult="2"
            child="1"
            user="John Doe"
            checkInDate="2024/02/17"
            checkOutDate="2024/02/19"
          />
        </div>
      </div>
    </div>
  );
}

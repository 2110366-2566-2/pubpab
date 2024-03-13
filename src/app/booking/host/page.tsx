import HostBookings from "@/components/booking/books/HostBookings";

export default function Host_Booking() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">Reserved Room</h1>
        <div className="flex w-full flex-col gap-4">
          <HostBookings />
        </div>
      </div>
    </div>
  );
}

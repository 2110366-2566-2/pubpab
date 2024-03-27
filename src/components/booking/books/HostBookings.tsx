"use client";

import { useSession } from "next-auth/react";

import HostBookingCard from "@/components/card/HostBookingCard";
import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

export default function HostBookings() {
  const { data: session } = useSession();
  if (session) {
    const findBookings = trpc.host.reservation.findMany.useQuery({
      host_id: session?.user?.id,
    });

    if (findBookings.error) {
      return <div>Error: {findBookings.error.message}</div>;
    }

    if (findBookings.isLoading) {
      return (
        <div>
          <LoadingScreen />
        </div>
      );
    }
    const bookings = findBookings.data;

    return (
      <div className="px-4 py-4">
        {bookings.map((booking, index) => (
          <div key={index} className="mb-4">
            <HostBookingCard
              firstname={booking.traveler.users?.first_name ?? ""}
              lastname={booking.traveler.users?.last_name ?? ""}
              checkInDate={booking.start_date.toLocaleDateString() ?? ""}
              checkOutDate={booking.end_date.toLocaleDateString() ?? ""}
              roomName={booking.room.room_name ?? ""}
              adult={booking.room.max_adult.toString() ?? ""}
              child={booking.room.max_children.toString() ?? ""}
              price={booking.payment.amount.toString() ?? ""}
              accomName={booking.room.accommodation?.name_a ?? ""}
              accommodation_id={
                booking.room.accommodation?.accommodation_id ?? ""
              }
              banner={booking.room.accommodation?.banner ?? ""}
            />
          </div>
        ))}
      </div>
    );
  }
}

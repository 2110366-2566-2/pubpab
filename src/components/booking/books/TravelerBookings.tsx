"use client";

import { useSession } from "next-auth/react";

import TravelerBookingCard from "@/components/card/TravelerBookingCard";
import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

export default function TravelerBookings() {
  const { data: session } = useSession();
  if (session) {
    const findBookings = trpc.traveler.reservation.findMany.useQuery({
      traveler_id: session?.user?.id,
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
            <TravelerBookingCard
              checkInDate={booking.start_date.toLocaleDateString() ?? ""}
              checkOutDate={booking.end_date.toLocaleDateString() ?? ""}
              roomName={booking.room.room_name ?? ""}
              adult={booking.room.max_adult.toString() ?? ""}
              child={booking.room.max_children.toString() ?? ""}
              price={booking.payment.amount.toString() ?? ""}
              accomName={booking.room.accommodation?.name_a ?? ""}
              reservation_id={booking.reservation_id}
              host_id={booking.room.accommodation?.host_id ?? ""}
              traveler_id={booking.traveler_id ?? ""}
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

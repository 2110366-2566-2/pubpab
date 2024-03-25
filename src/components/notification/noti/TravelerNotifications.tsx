"use client";

import { useSession } from "next-auth/react";

import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

import Traveler_Notification from "../box/TravelerNotificationBox";

export default function TravelerNotifications() {
  const { data: session } = useSession();
  if (session) {
    const findNotification = trpc.traveler.notification.findMany.useQuery({
      traveler_id: session?.user?.id,
    });

    if (findNotification.error) {
      return <div>Error: {findNotification.error.message}</div>;
    }

    if (findNotification.isLoading) {
      return (
        <div>
          <LoadingScreen />
        </div>
      );
    }
    const notifications = findNotification.data;

    return (
      <div className="px-4 py-4">
        {notifications.map((notification, index) => (
          <div key={index} className="mb-4">
            <Traveler_Notification
              sentDate={notification.timestamp?.toLocaleDateString() ?? ""}
              sentTime={notification.timestamp?.toLocaleTimeString() ?? ""}
              roomName={notification.reserve?.room?.room_name ?? ""}
              accommodationName={
                notification.reserve?.room?.accommodation?.name_a ?? ""
              }
              checkInDate={
                notification.reserve?.start_date?.toLocaleDateString() ?? ""
              }
              checkOutDate={
                notification.reserve?.end_date?.toLocaleDateString() ?? ""
              }
              totalAmount={
                notification.reserve?.payment?.amount?.toString() ?? ""
              }
              noti_type={notification.notification_type ?? ""}
              traveler_id={notification.reserve.traveler_id}
              accommodation_id={
                notification.reserve.room.accommodation?.accommodation_id ?? ""
              }
            />
          </div>
        ))}
      </div>
    );
  }
}

// const notifications = [
//   {
//     timestamp: new Date(),
//     reserve: {
//       room: {
//         room_name: "Sample Room",
//         accommodation: {
//           name_a: "Sample Accommodation",
//         },
//       },
//       start_date: new Date("2024-02-17"),
//       end_date: new Date("2024-02-19"),
//       payment: {
//         amount: 6969,
//       },
//     },
//     notification_type: true,
//   },
//   {
//     timestamp: new Date(),
//     reserve: {
//       room: {
//         room_name: "Sample Room",
//         accommodation: {
//           name_a: "Sample Accommodation",
//         },
//       },
//       start_date: new Date("2024-02-17"),
//       end_date: new Date("2024-02-19"),
//       payment: {
//         amount: 6969,
//       },
//     },
//     notification_type: true,
//   },
//   // Add more entries as needed
// ];

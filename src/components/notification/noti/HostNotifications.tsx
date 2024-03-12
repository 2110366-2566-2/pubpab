"use client";

import { useSession } from "next-auth/react";

import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

import Host_Notification from "../host/host_noti";

export default function HostNotifications() {
  const { data: session } = useSession();
  if (session) {
    const findNotification = trpc.host.notification.findMany.useQuery({
      host_id: session?.user?.id,
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
            <Host_Notification
              sentDate={notification.timestamp?.toLocaleDateString() ?? ""}
              sentTime={notification.timestamp?.toLocaleTimeString() ?? ""}
              firstName={notification.users?.first_name ?? ""}
              lastName={notification.users?.last_name ?? ""}
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
              //   isReserved={notification.notification_type ?? ""}
              isReserved={true}
            />
          </div>
        ))}
      </div>
    );
  }
}

// const findNotification = [
//     {
//       timestamp: new Date(),
//       users: {
//         first_name: "John",
//         last_name: "Doe",
//       },
//       reserve: {
//         room: {
//           room_name: "Sample Room",
//           accommodation: {
//             name_a: "Sample Accommodation",
//           },
//         },
//         start_date: new Date("2024-02-17"),
//         end_date: new Date("2024-02-19"),
//         payment: {
//           amount: 6969,
//         },
//       },
//       notification_type: true,
//     },
//     // Add more entries as needed
//   ];

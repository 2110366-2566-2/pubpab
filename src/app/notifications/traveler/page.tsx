import Traveler_Notification from "@/components/notification/box/TravelerNotificationBox";

export default function Traveler_Notifications() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">Notifications</h1>
        <div className="flex w-full flex-col gap-4">
          <Traveler_Notification
            sentDate="2024-02-17"
            sentTime="12:00 PM"
            roomName="Loli Room"
            accommodationName="Loli Hotel"
            checkInDate="2024/02/21"
            checkOutDate="2024/02/25"
            totalAmount="฿6,969"
            noti_type="Reservation"
          />
          <Traveler_Notification
            sentDate="2024-02-19"
            sentTime="17:30 PM"
            roomName="Deluxe Room"
            accommodationName="Hawaiian Hotel"
            checkInDate="2024/02/26"
            checkOutDate="2024/02/29"
            totalAmount="฿1,112"
            noti_type="Cancellation"
          />
          <Traveler_Notification
            sentDate="2024-02-20"
            sentTime="08:00 AM"
            roomName="Loli Room"
            accommodationName="Loli Hotel"
            checkInDate="2024/02/21"
            checkOutDate="2024/02/25"
            totalAmount="฿6,969"
            noti_type="Reminder"
          />
        </div>
      </div>
    </div>
  );
}

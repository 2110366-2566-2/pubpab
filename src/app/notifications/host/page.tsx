import Host_Notification from "@/components/notification/box/HostNotificationBox";

export default function Host_Notifications() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">Notifications</h1>
        <div className="flex w-full flex-col gap-4">
          <Host_Notification
            sentDate="2024-02-17"
            sentTime="12:00 PM"
            firstName="Chef"
            lastName="Smart"
            roomName="Loli Room"
            accommodationName="Loli Hotel"
            checkInDate="2024/02/17"
            checkOutDate="2024/02/19"
            totalAmount="฿6,969"
            noti_type="Reservation"
          />
          <Host_Notification
            sentDate="2024-02-19"
            sentTime="17:30 PM"
            firstName="Pizza"
            lastName="Company"
            roomName="Deluxe Room"
            accommodationName="Hawaiian Hotel"
            checkInDate="2024/02/19"
            checkOutDate="2024/02/20"
            totalAmount="฿1,112"
            noti_type="Cancellation"
          />
          <Host_Notification
            sentDate="2024-02-23"
            sentTime="1:00 PM"
            firstName="Kentucky"
            lastName="Fried Chicken"
            roomName="Superior Room"
            accommodationName="Hot&Spicy Hotel"
            checkInDate="2024/02/23"
            checkOutDate="2024/02/27"
            totalAmount="฿1,150"
            noti_type="Reservation"
          />
        </div>
      </div>
    </div>
  );
}

import TravelerNotifications from "@/components/notification/noti/TravelerNotifications";

export default function Traveler_Notifications() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">Notifications</h1>
        <div className="flex w-full flex-col gap-4">
          <TravelerNotifications />
        </div>
      </div>
    </div>
  );
}

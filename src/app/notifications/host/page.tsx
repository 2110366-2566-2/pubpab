// import Host_Notification from "@/components/notification/host/host_noti";
import HostNotifications from "@/components/notification/noti/HostNotifications";

export default function Host_Notifications() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="p-4">
        <h1 className="mb-4 w-full text-3xl font-semibold">Notifications</h1>
        <div className="flex w-full flex-col gap-4">
          <HostNotifications />
        </div>
      </div>
    </div>
  );
}

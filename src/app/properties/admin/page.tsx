import AdminVerifyProperties from "@/components/properties/AdminVerifyProperties";
import VerifyRoomCard from "@/components/VerifyRoomCard";

export default async function AdminVerifyPropertiesPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col space-y-8">
        <div>
          <AdminVerifyProperties />
          <VerifyRoomCard />
        </div>
      </div>
    </div>
  );
}

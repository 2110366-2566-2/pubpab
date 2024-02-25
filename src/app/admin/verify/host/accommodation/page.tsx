import AdminHostProperties from "@/components/admin/AdminHostProperties";

export default async function AdminUnverifiedHostPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col space-y-8">
        <div>
          <AdminHostProperties />
        </div>
      </div>
    </div>
  );
}

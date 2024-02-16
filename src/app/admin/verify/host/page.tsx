import AdminUnverifiedHost from "@/components/admin/AdminUnverifiedHost";

export default async function AdminUnverifiedHostPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col space-y-8">
        <div>
          <AdminUnverifiedHost />
        </div>
      </div>
    </div>
  );
}

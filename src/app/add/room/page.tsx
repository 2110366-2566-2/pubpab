import RoomAddForm from "@/components/add/room/RoomAddForm";

export default async function RoomAddPage() {
  return (
    <div className="flex justify-center px-4 py-12">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col space-y-8">
          <div>
            <RoomAddForm />
          </div>
        </div>
      </div>
    </div>
  );
}

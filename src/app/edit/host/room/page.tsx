import HostEditRoomForm from "@/components/edit/room/HostEditRoomForm";

export default async function HostEditRoomPage({
  searchParams,
}: {
  searchParams: {
    room_id: string;
  };
}) {
  return (
    <div className="my-12 flex min-h-screen justify-center">
      <HostEditRoomForm room_id={searchParams.room_id} />
    </div>
  );
}

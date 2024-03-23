"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";

const CancelReservationButton = ({
  reservation_id,
  traveler_id,
  host_id,
}: {
  reservation_id: string;
  traveler_id: string;
  host_id: string;
}) => {
  // const router = useRouter();
  const { data: session } = useSession();
  const mutate = trpc.traveler.reservation.updateStatus.useMutation();
  const host_noti = trpc.host.notification.create.useMutation();
  const traveler_noti = trpc.traveler.notification.create.useMutation();

  // const handleHostNotificationClick = async () => {
  //     router.push("/notifications/host");
  // };

  const handleCancelClick = async () => {
    mutate.mutate({
      reservation_id: reservation_id,
      check_in_status: "Cancel",
    });
    host_noti.mutate({
      user_id: host_id,
      reservation_id: reservation_id,
      notification_type: "Cancellation",
    });
    traveler_noti.mutate({
      user_id: traveler_id,
      reservation_id: reservation_id,
      notification_type: "Cancellation",
    });
  };

  if (session && session.user) {
    if (session.user.role == "Travelers") {
      return (
        <Button
          variant={"link"}
          onClick={handleCancelClick}
          className="h-10 bg-[#701414] px-12 text-white hover:bg-red-600"
        >
          Cancel
        </Button>
      );
    }
  }

  return null;
};

export default CancelReservationButton;

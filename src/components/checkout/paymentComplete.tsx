"use client";

import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import Stripe from "stripe";
import { useState, useEffect } from "react";

const paymentComplete = ({
  host_id,
  room_id,
  payment_id,
  checkout_id,
  checkInDate,
  checkOutDate,
}: {
  host_id: string;
  room_id: string;
  payment_id: string;
  checkout_id: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
  const { data: session } = useSession();

  const updatePayment = trpc.payment.updateStatus.useMutation();
  const createTravelerReserve = trpc.traveler.reservation.create.useMutation();
  const createTravelerNotification =
    trpc.traveler.notification.create.useMutation();
  const createHostNotification = trpc.host.notification.create.useMutation();

  const traveler_id = session?.user?.id || "";

  const stripe = new Stripe(
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
    {
      apiVersion: "2023-10-16",
    },
  );
  if (!stripe) {
    throw new Error("none stripe check id again");
  }
  const [isLoading, setIsLoading] = useState(false);

  async function onContinuePayment() {
    setIsLoading(true);
    const session = await stripe.checkout.sessions.retrieve(checkout_id);
    if (session.status == "complete" && isLoading) {
      updatePayment.mutate({
        payment_id: payment_id,
        payment_status: "Success",
      });

      const travelerReserve = await createTravelerReserve.mutateAsync({
        room_id: room_id,
        traveler_id: traveler_id,
        payment_id: payment_id,
        start_date: new Date(checkInDate),
        end_date: new Date(checkOutDate),
      });

      createTravelerNotification.mutate({
        user_id: traveler_id,
        reservation_id: travelerReserve.reservation_id,
        notification_type: "Reservation",
      });

      createHostNotification.mutate({
        user_id: host_id,
        reservation_id: travelerReserve.reservation_id,
        notification_type: "Reservation",
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    onContinuePayment();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-row gap-2 rounded-lg bg-white shadow-md">
      <h1>Payment Successful</h1>
    </div>
  );
};
export default paymentComplete;

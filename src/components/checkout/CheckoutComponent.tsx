"use client";

import { useEffect } from "react";
import getStripe from "@/lib/get-stripe"; // Import the getStripe function
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";

export default function CheckoutComponent({
  checkInDate,
  checkOutDate,
  room_id,
  host_id,
  price,
}: {
  checkInDate: string;
  checkOutDate: string;
  room_id: string;
  host_id: string;
  price: string;
}) {
  const createTravelerReserve = trpc.traveler.reservation.create.useMutation();
  const createTravelerNotification =
    trpc.traveler.notification.create.useMutation();
  const createCheckout = trpc.payment.createCheckout.useMutation();
  const createHostNotification = trpc.host.notification.create.useMutation();
  const { data: session } = useSession();
  const traveler_id = session?.user?.id || "";
  return (
    <div id="payment-element">
      {/* This is where the payment element will be mounted */}
    </div>
  );
}

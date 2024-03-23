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
  const createPayment = trpc.payment.create.useMutation();
  const createTravelerReserve = trpc.traveler.reservation.create.useMutation();
  const createTravelerNotification =
    trpc.traveler.notification.create.useMutation();
  const createCheckout = trpc.payment.createCheckout.useMutation();
  const createHostNotification = trpc.host.notification.create.useMutation();
  const { data: session } = useSession();
  const traveler_id = session?.user?.id || "";
  let payment_id = "";
  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        const response = await createCheckout.mutateAsync({
          amount: parseInt(price, 10) * 100,
        });
        const payment = await createPayment.mutateAsync({
          amount: parseInt(price, 10),
          host_bank_account: "11111111",
        });
        payment_id = payment.newPayment.payment_id;
        const stripe = await getStripe();
        if (stripe) {
          const elements = stripe.elements({
            clientSecret: response?.client_secret || "",
            loader: "auto",
          });
          const paymentElement = elements?.create("payment", {
            layout: { type: "tabs" },
          });
          paymentElement.mount("#payment-element");
        } else {
          throw new Error("none stripe check id again");
        }
      } catch (error) {
        console.error("Error initializing checkout:", error);
        // Handle error
      }
    };
    initializeCheckout();
  }, []);

  return (
    <div id="payment-element">
      {/* This is where the payment element will be mounted */}
    </div>
  );
}

export function CheckoutForm({
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
  price: number;
}) {
  // const payment = await createPayment.mutateAsync({
  //   amount: price,
  //   host_bank_account: "11111111",
  // });
  // const travelerReserve = await createTravelerReserve.mutateAsync({
  //   room_id: room_id,
  //   traveler_id: traveler_id,
  //   payment_id: payment.newPayment.payment_id,
  //   start_date: new Date(checkInDate),
  //   end_date: new Date(checkOutDate),
  // });
  //  createTravelerNotification.mutate({
  //   user_id: traveler_id,
  //   reservation_id: travelerReserve.reservation_id,
  //   notification_type: "Reservation",
  // });
  // createHostNotification.mutate({
  //   user_id: host_id,
  //   reservation_id: travelerReserve.reservation_id,
  //   notification_type: "Reservation",
  // });
}

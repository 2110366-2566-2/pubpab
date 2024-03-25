import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { trpc } from "@/lib/trpc/client";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    let event;
    const result = "Webhook called.";
    const updatePayment = trpc.payment.updateStatus.useMutation();
    const createTravelerReserve =
      trpc.traveler.reservation.create.useMutation();
    const createTravelerNotification =
      trpc.traveler.notification.create.useMutation();
    const createHostNotification = trpc.host.notification.create.useMutation();

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await req.text();
      const signature = req.headers.get("stripe-signature");
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature as string,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );

      // Successfully constructed event
      console.log("✅ Success:", event.id);

      // 2. Handle event type (add business logic here)
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const meta = session?.metadata;

        updatePayment.mutate({
          payment_id: meta?.payment_id || "",
          payment_status: "Success",
        });

        const travelerReserve = await createTravelerReserve.mutateAsync({
          room_id: meta?.room_id || "",
          traveler_id: meta?.traveler_id || "",
          payment_id: meta?.payment_id || "",
          start_date: new Date(meta?.checkInDate || ""),
          end_date: new Date(meta?.checkOutDate || ""),
        });

        createTravelerNotification.mutate({
          user_id: meta?.traveler_id || "",
          reservation_id: travelerReserve.reservation_id,
          notification_type: "Reservation",
        });

        createHostNotification.mutate({
          user_id: meta?.host_id || "",
          reservation_id: travelerReserve.reservation_id,
          notification_type: "Reservation",
        });

        console.log(`💰  Payment received!`);
      } else {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      console.log(`❌ Error message: ${err}`);
      // res.status(400).json(`Webhook Error: ${err}`);
      return NextResponse.json(
        { message: `Webhook Error: ${err}` },
        { status: 400 },
      );
    }

    // 3. Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true, status: result });
  } else {
    // res.setHeader("Allow", "POST");
    // res.status(405).end("Method Not Allowed");
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 },
    );
  }
}

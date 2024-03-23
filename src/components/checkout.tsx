"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import getStripe from "@/lib/get-stripe";

const CheckoutButton = () => {
  const createCheckout = trpc.payment.createCheckout.useMutation();
  const [redirecting] = useState(false);

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const response = await createCheckout.mutateAsync();
    // Redirect to checkout
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error("none stripe check id again");
    }
    await stripe.redirectToCheckout({ sessionId: response.id });
  };

  return (
    <>
      <div className="mt-8 flex flex-col items-end border-t py-4">
        <button
          onClick={redirectToCheckout}
          disabled={redirecting}
          className="mt-4 max-w-max rounded border border-rose-500 bg-rose-500 px-6 py-2 text-white transition-colors hover:border-rose-600 hover:bg-rose-600 focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-500"
        >
          {redirecting ? "Redirecting..." : "Go to Checkout"}
        </button>
      </div>
    </>
  );
};

export default CheckoutButton;

// Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
//   price: id,
//   quantity,
// }))

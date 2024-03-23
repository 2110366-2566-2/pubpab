"use client";

import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import getStripe from "@/lib/get-stripe";
import { trpc } from "@/lib/trpc/client";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/",
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message ?? "");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export async function checkout() {
  const createCheckout = trpc.payment.createCheckout.useMutation();
  const response = await createCheckout.mutateAsync();
  const stripe = await getStripe();
  if (!stripe && !response) {
    throw new Error("none stripe check id again");
  }
  const elements = stripe?.elements({
    clientSecret: response?.client_secret || "",
    loader: "auto",
  });
  const payEl = elements?.create("payment", { layout: { type: "tabs" } });
  return payEl;
}

import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";

// import { createTRPCRouter, protectedProcedure } from "";
import { router, publicProcedure } from "@/server/trpc";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});
export const stripeRouter = router({
  // getSubscriptionCheckoutURL: publicProcedure.query(async ({ ctx }) => {
  //   const stripe = new Stripe(stripeSecretKey, {
  //     apiVersion: "2023-10-16",
  //   });
  //   const url = process.env.URL;

  //   const checkoutSession = await stripe.checkout.sessions.create({
  //     mode: "subscription",
  //     line_items: [
  //       {
  //         price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
  //         quantity: 1,
  //       },
  //     ],

  //     success_url: `${url}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${url}/packages`,
  //     subscription_data: {
  //       metadata: {
  //         userId: ctx.auth.userId,
  //       },
  //       trial_period_days: 7,
  //     },
  //   });

  //   if (!checkoutSession.url) {
  //     throw new TRPCError({
  //       code: "BAD_REQUEST",
  //       message: "Could not create checkout message",
  //     });
  //   }

  //   return { redirectURL: checkoutSession.url };
  // }),

  // getLifeTimeCheckoutURL: publicProcedure.query(async ({ ctx }) => {
  //   const url = process.env.URL;
  //   const checkoutSession = await stripe.checkout.sessions.create({
  //     mode: "payment",
  //     line_items: [
  //       {
  //         price: process.env.STRIPE_LIFETIME_PRICE_ID,
  //         quantity: 1,
  //       },
  //     ],
  //     success_url: `${url}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${url}/packages`,
  //     metadata: {
  //       // userId: ctx.auth.user,
  //     },
  //   });

  //   if (!checkoutSession.url) {
  //     throw new TRPCError({
  //       code: "BAD_REQUEST",
  //       message: "Could not create checkout session",
  //     });
  //   }

  //   return { redirectURL: checkoutSession.url };
  // }),
  // cancelSubscription: publicProcedure
  //   .input(z.object({ stripeCustomerId: z.string() }))
  //   .mutation(async ({ input }) => {
  //     const { stripeCustomerId } = input;
  //     const stripe = new Stripe(stripeSecretKey, {
  //       apiVersion: "2023-10-16",
  //     });

  //     const subscription = await stripe.subscriptions.list({
  //       customer: stripeCustomerId,
  //     });
  //     const subscriptionId = subscription.data[0]!.id;

  //     await stripe.subscriptions.update(subscriptionId, {
  //       cancel_at_period_end: true,
  //     });

  //     return { message: "Membership Cancelled" };
  //   }),
  // resumeSubscription: publicProcedure
  //   .input(z.object({ stripeCustomerId: z.string() }))
  //   .mutation(async ({ input }) => {
  //     const { stripeCustomerId } = input;
  //     const stripe = new Stripe(stripeSecretKey, {
  //       apiVersion: "2023-10-16",
  //     });

  //     const subscription = await stripe.subscriptions.list({
  //       customer: stripeCustomerId,
  //     });
  //     const subscriptionId = subscription.data[0]!.id;

  //     await stripe.subscriptions.update(subscriptionId, {
  //       cancel_at_period_end: false,
  //     });

  //     return { message: "Membership Resumed" };
  //   }),
  createPromptPaySession: publicProcedure
    .input(z.object({ amount: z.number() }))
    .mutation(async ({ input }) => {
      const { amount } = input;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["promptpay"],
        line_items: [
          {
            price_data: {
              currency: "thb",
              product_data: {
                name: "Product Name", // Change to your product name
              },
              unit_amount: amount * 100, // Amount in the smallest currency unit (cents for THB)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      });

      if (!session.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Could not create payment session",
        });
      }

      return { redirectURL: session.url };
    }),
});

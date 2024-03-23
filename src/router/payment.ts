import Stripe from "stripe";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2023-10-16",
  },
);

export const paymentRouter = router({
  create: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        host_bank_account: z.string(),
        qrcode_payment: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const newPayment = await prisma.payment.create({
        data: {
          amount: input.amount,
          host_bank_account: input.host_bank_account,
          // traveler_bank_account: input.traveler_bank_account,
          // payment_status: input.payment_status,
          qrcode_payment: input.qrcode_payment,
        },
      });
      return { newPayment };
    }),

  createCheckout: publicProcedure.mutation(async () => {
    return stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "promptpay"],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1Otoj8AUCR58YXE60ouYQFlV",
          quantity: 1,
        },
      ],
      success_url:
        process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
        "http://localhost:3000/register/host", // Set success URL dynamicaler (consider environment variables)
      cancel_url:
        process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL ||
        "http://localhost:3000/register/traveler", // Set cancel URL dynamically (consider environment variables)
    });
  }),
  updateStatus: publicProcedure
    .input(
      z.object({
        payment_id: z.string(),
        payment_status: z.enum(["Waiting", "Ongoing", "Success", "Fail"]),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = await prisma.payment.update({
        where: { payment_id: input.payment_id },
        data: {
          timestamp: new Date(),
          payment_status: input.payment_status,
        },
      });
      return newIssue;
    }),
});

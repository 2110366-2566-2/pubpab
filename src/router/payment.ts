import Stripe from "stripe";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

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

  createCheckout: publicProcedure
    .input(
      z.object({
        room_id: z.string(),
        accom_id: z.string(),
        room_name: z.string(),
        accom_name: z.string(),
        amount: z.number(),
        host_id: z.string(),
        checkInDate: z.string(),
        checkOutDate: z.string(),
        payment_id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const totalAmount = input.amount * 100;
      if (totalAmount < 10) {
        throw new Error("Amount must be at least ฿10.00 thb");
      }
      return stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "promptpay"],
        metadata: {
          room_id: input.room_id,
          accom_id: input.accom_id,
          host_id: input.host_id,
          payment_id: input.payment_id,
          checkInDate: input.checkInDate,
          checkOutDate: input.checkOutDate,
        },
        line_items: [
          {
            price_data: {
              unit_amount: totalAmount,
              currency: "thb",
              product_data: {
                name: input.accom_name,
                description: input.room_name,
              },
            },
            quantity: 1,
          },
        ],
        success_url:
          process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || `http://localhost:3000`,
        cancel_url:
          process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL ||
          `http://localhost:3000/searchprop/PropInfo?accom_id=${input.accom_id}`,
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

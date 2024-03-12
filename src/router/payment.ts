import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const paymentRouter = router({
  create: publicProcedure
    .input(
      z.object({
        payment_id: z.string(),
        amount: z.number(),
        host_bank_account: z.string(),
        qrcode_payment: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = await prisma.payment.create({
        data: {
          payment_id: input.payment_id,
          amount: input.amount,
          host_bank_account: input.host_bank_account,
          // traveler_bank_account: input.traveler_bank_account,
          // payment_status: input.payment_status,
          qrcode_payment: input.qrcode_payment,
        },
      });
      return newIssue;
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

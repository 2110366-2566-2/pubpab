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
        traveler_bank_account: z.string(),
        payment_status: z.enum(["Waiting", "Ongoing", "Success", "Fail"]),
        qrcode_payment: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = await prisma.payment.create({
        data: {
          payment_id: input.payment_id,
          amount: input.amount,
          host_bank_account: input.host_bank_account,
          traveler_bank_account: input.traveler_bank_account,
          payment_status: input.payment_status,
          qrcode_payment: input.qrcode_payment,
        },
      });
      return newIssue;
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const hostReservationRouter = router({
  findMany: publicProcedure
    .input(
      z.object({
        host_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const notis = await prisma.notification.findMany({
        where: { user_id: input.host_id },
        select: {
          users: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
          reserve: {
            select: {
              payment_id: true,
              room_id: true,
              start_date: true,
              end_date: true,
              payment: {
                select: {
                  amount: true,
                },
              },
              room: {
                select: {
                  room_name: true,
                  max_adult: true,
                  max_children: true,
                  accommodation: {
                    select: {
                      name_a: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!notis) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "host notification not found",
        });
      }
      return notis;
    }),
});

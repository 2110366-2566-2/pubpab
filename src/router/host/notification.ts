import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const hostNotificationRouter = router({
  create: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        reservation_id: z.string(),
        notification_type: z.enum(["Reservation", "Cancellaion"]),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = await prisma.notification.create({
        data: {
          user_id: input.user_id,
          reservation_id: input.reservation_id,
          notification_type: input.notification_type,
        },
      });
      return newIssue;
    }),
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
          notification_type: true,
          timestamp: true,
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

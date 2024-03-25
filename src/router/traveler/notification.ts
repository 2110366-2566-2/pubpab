import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const travelerNotificationRouter = router({
  create: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        reservation_id: z.string(),
        notification_type: z.enum([
          "Reservation",
          "Reminder",
          "Cancellation",
          "Review",
        ]),
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
        traveler_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const notis = await prisma.notification.findMany({
        where: { user_id: input.traveler_id, timestamp: { lt: new Date() } },
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
              traveler_id: true,
              reservation_id: true,
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
                      accommodation_id: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { timestamp: "desc" },
      });
      if (!notis) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "traveler notification not found",
        });
      }
      return notis;
    }),
});

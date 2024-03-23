import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const travelerReservationRouter = router({
  findMany: publicProcedure
    .input(
      z.object({
        traveler_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const reserves = await prisma.reserve.findMany({
        where: {
          traveler_id: input.traveler_id,
          check_in_status: {
            not: "Cancel",
          },
        },
        select: {
          start_date: true,
          end_date: true,
          reservation_id: true,
          traveler_id: true,
          room: {
            select: {
              room_name: true,
              max_adult: true,
              max_children: true,
              accommodation: {
                select: {
                  name_a: true,
                  host_id: true,
                },
              },
            },
          },
          payment: {
            select: {
              amount: true,
            },
          },
        },
      });
      if (!reserves) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "host reservations not found",
        });
      }
      return reserves;
    }),
  create: publicProcedure
    .input(
      z.object({
        room_id: z.string(),
        traveler_id: z.string(),
        payment_id: z.string(),
        start_date: z.date(),
        end_date: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = await prisma.reserve.create({
        data: {
          room_id: input.room_id,
          traveler_id: input.traveler_id,
          payment_id: input.payment_id,
          start_date: input.start_date,
          end_date: input.end_date,
        },
      });
      return newIssue;
    }),
  updateStatus: publicProcedure
    .input(
      z.object({
        reservation_id: z.string(),
        check_in_status: z.enum(["Not_checkin", "Checkin", "Cancel"]),
      }),
    )
    .mutation(async ({ input }) => {
      const newIssue = await prisma.reserve.update({
        where: { reservation_id: input.reservation_id },
        data: {
          check_in_status: input.check_in_status,
        },
      });
      return newIssue;
    }),
});

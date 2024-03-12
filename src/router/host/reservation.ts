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
      const reserves = await prisma.reserve.findMany({
        where: {
          room: {
            accommodation: {
              host_id: input.host_id,
            },
          },
        },
        select: {
          start_date: true,
          end_date: true,
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
          traveler: {
            select: {
              users: {
                select: {
                  first_name: true,
                  last_name: true,
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
});

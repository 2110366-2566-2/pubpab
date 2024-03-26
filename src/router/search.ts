import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const searchRouter = router({
  filter: publicProcedure
    .input(
      z.object({
        accom_name: z.string().optional(),
        rating: z.number().optional(),
        price: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const filteredAccommodation = await prisma.accommodation.findMany({
        where: {
          name_a: {
            contains: input.accom_name,
            mode: "insensitive",
          },
          rating: {
            gte: input.rating,
          },
          price: {
            lte: input.price,
          },
        },
      });
      if (!filteredAccommodation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accommodation found",
        });
      }
      return filteredAccommodation;
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const feedbackRouter = router({
  writeReview: publicProcedure
    .input(
      z.object({
        traveler_id: z.string(),
        accommodation_id: z.string(),
        reservation_id: z.string(),
        picture: z.string().optional(),
        text: z.string().optional(),
        score: z.number().min(1).max(5),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Create the review if all conditions are met
        const newFeedback = await prisma.feedback.create({
          data: {
            reservation_id: input.reservation_id,
            traveler_id: input.traveler_id,
            accommodation_id: input.accommodation_id,
            picture: input.picture,
            text: input.text,
            score: input.score,
          },
        });
        const reviewCount = await prisma.feedback.count({
          where: {
            accommodation_id: input.accommodation_id,
          },
        });

        // Fetch the existing average rating of the accommodation
        const existingAccommodation = await prisma.accommodation.findUnique({
          where: {
            accommodation_id: input.accommodation_id,
          },
          select: {
            rating: true,
          },
        });

        // Calculate new average rating
        if (!existingAccommodation) {
          return newFeedback;
        }
        const newAverageRating =
          (existingAccommodation.rating * reviewCount + input.score) /
          reviewCount;

        // Update the accommodation with the new average rating
        await prisma.accommodation.update({
          where: {
            accommodation_id: input.accommodation_id,
          },
          data: {
            rating: newAverageRating,
          },
        });

        return newFeedback;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error("Error creating feedback:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error during feedback creation",
        });
      }
    }),
  accommodationReviews: publicProcedure
    .input(
      z.object({
        accommodation_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const reviewsWithRooms = await prisma.feedback.findMany({
          where: {
            accommodation_id: input.accommodation_id,
          },
          select: {
            picture: true,
            text: true,
            score: true,
            timestamp: true,
            reserve: {
              select: {
                room_id: true,
                room: {
                  select: {
                    room_name: true,
                    accommodation: {
                      select: {
                        accommodation_id: true,
                        name_a: true,
                        address_a: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return reviewsWithRooms;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching accommodation reviews",
        });
      }
    }),
});

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
        picture: z.string().optional(),
        text: z.string().optional(),
        score: z.number().min(1).max(5),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { traveler_id, accommodation_id } = input;

        // Check if the traveler has a reservation for the specified accommodation
        const reservation = await prisma.reserve.findFirst({
          where: {
            traveler_id,
            room: {
              accommodation: {
                accommodation_id,
              },
            },
            end_date: {
              lte: new Date(), // Ensure current time is after end_date
            },
          },
          include: {
            room: true, // Include the room information in the result
          },
        });

        if (!reservation) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Traveler has not reserved this accommodation or it is not yet checkout time.",
          });
        }

        // Create the review if all conditions are met
        const newFeedback = await prisma.feedback.create({
          data: {
            traveler_id,
            accommodation_id,
            picture: input.picture,
            text: input.text,
            score: input.score,
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
            accommodation: {
              select: {
                accommodation_id: true,
                name_a: true,
                room: {
                  room_name: true,
                },
                reserve: {
                  start_date: true,
                  end_date: true,
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

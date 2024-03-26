import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

// Function to calculate distance between two coordinates in kilometers
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // deg2rad below
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

export const searchRouter = router({
  filter: publicProcedure
    .input(
      z.object({
        radius: z.number().optional(),
        accom_name: z.string().optional(),
        rating: z.number().optional(),
        priceMin: z.number().optional(),
        priceMax: z.number().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        checkInDate: z.date().optional(),
        checkOutDate: z.date().optional(),
      }),
    )
    .query(async ({ input }) => {
      const filteredAccommodation = await prisma.accommodation.findMany({
        where: {
          accommodation_status: "OPEN",
          name_a: {
            contains: input.accom_name,
            mode: "insensitive",
          },
          rating: {
            gte: input.rating,
          },
          price: {
            gte: input.priceMin,
            lte: input.priceMax,
          },
          room: {
            some: {
              reserve: {
                none: {
                  AND: [
                    {
                      start_date: {
                        lte: input.checkOutDate,
                      },
                    },
                    {
                      end_date: {
                        gte: input.checkInDate,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        include: {
          room: {
            include: {
              reserve: true,
            },
          },
        },
      });

      if (input.latitude && input.longitude && input.radius) {
        const filteredAccommodations = filteredAccommodation.filter(
          (accommodation) => {
            // Extract latitude and longitude from ggmap_link
            const [latString, lngString] =
              accommodation.ggmap_link?.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) ||
              [];
            if (!latString || !lngString) return false; // Skip accommodations without valid coordinates

            const lat = parseFloat(latString);
            const lng = parseFloat(lngString);

            // Calculate distance between provided location and accommodation
            const distance = calculateDistance(
              input.latitude || 0,
              input.longitude || 0,
              lat,
              lng,
            );
            return distance <= (input.radius || 100);
          },
        );

        return filteredAccommodations;
      }
      if (!filteredAccommodation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accommodation found",
        });
      }
      return filteredAccommodation;
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const accomodationRouter = router({
  findAll: publicProcedure
    .query(async () => {
      const getAccomodation = await prisma.accommodation.findMany({
        where: {
          accommodation_id: undefined,
        },
        select: {
          name_a: true,
          description_a: true,
          qr_code: true,
          address_a: true,
          city: true,
          province: true,
          distinct_a: true,
          postal_code: true,
          ggmap_link: true,
          accommodation_status: true,
          rating: true,
          price: true,
        }
      })
      if (!getAccomodation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accommodation not found",
        });
      }
      return getAccomodation;
    }),
  find: publicProcedure
    .input(
      z.object({
        host_id: z.string(),
        accommodation_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const getAccomodation = await prisma.accommodation.findUnique({
        where: {
          accommodation_id: input.accommodation_id,
          host_id: input.host_id,
        },
        select: {
          name_a: true,
          description_a: true,
          qr_code: true,
          address_a: true,
          city: true,
          province: true,
          distinct_a: true,
          postal_code: true,
          ggmap_link: true,
          accommodation_status: true,
          rating: true,
        },
      });
      if (!getAccomodation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accommodation not found",
        });
      }
      return getAccomodation;
    }),
  findMany: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const getAccomodation = await prisma.accommodation.findMany({
        where: { accommodation_id: input.id },
        select: {
          room: {
            select: {
              room_id: true,
              is_reserve: true,
              room_name: true,
              banner: true,
            },
          },
        },
      });
      if (!getAccomodation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accommodation not found",
        });
      }
      return getAccomodation;
    }),
  create: publicProcedure
    .input(
      z.object({
        host_id: z.string(),
        qr_code: z.string(),
        name_a: z.string(),
        description_a: z.string(),
        price: z.number(),
        banner: z.string().optional(),
        address_a: z.string(),
        city: z.string(),
        province: z.string(),
        distinct_a: z.string(),
        postal_code: z.string(),
        ggmap_link: z.string(),
        rating: z.number(),
        accommodation_status: z.enum(["OPEN", "CLOSE"]),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const acom_newIssue = await prisma.accommodation.create({
          data: {
            host_id: input.host_id,
            qr_code: input.qr_code,
            name_a: input.name_a,
            description_a: input.description_a,
            price: input.price,
            banner: input.banner,
            address_a: input.address_a,
            city: input.city,
            province: input.province,
            distinct_a: input.distinct_a,
            postal_code: input.postal_code,
            ggmap_link: input.ggmap_link,
            rating: input.rating,
            accommodation_status: input.accommodation_status,
          },
        });
        return acom_newIssue;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error during accommodation creation",
        });
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        accommodation_id: z.string(),
        name_a: z.string().optional(),
        description_a: z.string().optional(),
        address_a: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        distinct_a: z.string().optional(),
        postal_code: z.string().optional(),
        ggmap_link: z.string().optional(),
        accommodation_status: z.enum(["OPEN", "CLOSE"]).optional(),
        qr_code: z.string().optional(),
        rating: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const AccommodationUpdateData = {
        name_a: input.name_a,
        description_a: input.description_a,
        address_a: input.address_a,
        city: input.city,
        province: input.province,
        distinct_a: input.distinct_a,
        postal_code: input.postal_code,
        ggmap_link: input.ggmap_link,
        accommodation_status: input.accommodation_status,
        qr_code: input.qr_code,
        rating: input.rating,
      };
      const acom_newIssue = await prisma.accommodation.update({
        where: { accommodation_id: input.accommodation_id },
        data: AccommodationUpdateData,
      });
      if (!acom_newIssue) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error during accommodation update",
        });
      }
      return acom_newIssue;
    }),
  delete: publicProcedure
    .input(z.object({ accommodation_id: z.string() }))
    .mutation(async ({ input }) => {
      const room = await prisma.accommodation.delete({
        where: { accommodation_id: input.accommodation_id },
      });
      if (!room) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "room not found",
        });
      }
    }),
});

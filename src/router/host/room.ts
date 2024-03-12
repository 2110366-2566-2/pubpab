import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const roomRouter = router({
  find: publicProcedure
    .input(
      z.object({
        room_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const getAccomodation = await prisma.room.findUnique({
        where: {
          room_id: input.room_id,
        },
        select: {
          room_name: true,
          price: true,
          floor: true,
          is_reserve: true,
          room_no: true,
          smoking: true,
          noise: true,
          pet: true,
          washing_machine: true,
          bed_type: true,
          restroom: true,
          wifi_available: true,
          accommodation_id: true,
          max_adult: true,
          max_children: true,
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
    .input(z.object({ accommodation_id: z.string() }))
    .query(async ({ input }) => {
      const getAccomodation = await prisma.accommodation.findMany({
        where: { accommodation_id: input.accommodation_id },
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
        accommodation_id: z.string(),
        room_name: z.string(),
        price: z.number(),
        floor: z.number(),
        is_reserve: z.boolean(),
        room_no: z.string(),
        smoking: z.boolean(),
        noise: z.boolean(),
        pet: z.boolean(),
        washing_machine: z.boolean(),
        bed_type: z.enum(["KING", "QUEEN"]),
        restroom: z.boolean(),
        wifi_available: z.boolean(),
        max_adult: z.number(),
        max_children: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const room = await prisma.room.create({
          data: {
            accommodation_id: input.accommodation_id,
            room_name: input.room_name,
            price: input.price,
            floor: input.floor,
            is_reserve: input.is_reserve,
            room_no: input.room_no,
            smoking: input.smoking,
            noise: input.noise,
            pet: input.pet,
            washing_machine: input.washing_machine,
            bed_type: input.bed_type,
            restroom: input.restroom,
            wifi_available: input.wifi_available,
            max_adult: input.max_adult,
            max_children: input.max_children,
          },
        });
        return room;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error during room creation",
        });
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        room_id: z.string(),
        room_name: z.string().optional(),
        price: z.number().optional(),
        floor: z.number().optional(),
        is_reserve: z.boolean().optional(),
        room_no: z.string().optional(),
        smoking: z.boolean().optional(),
        noise: z.boolean().optional(),
        pet: z.boolean().optional(),
        washing_machine: z.boolean().optional(),
        bed_type: z.enum(["KING", "QUEEN"]).optional(),
        restroom: z.boolean().optional(),
        wifi_available: z.boolean().optional(),
        max_adult: z.number().optional(),
        max_children: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const RoomUpdateData = {
        room_name: input.room_name,
        price: input.price,
        floor: input.floor,
        is_reserve: input.is_reserve,
        room_no: input.room_no,
        smoking: input.smoking,
        noise: input.noise,
        pet: input.pet,
        washing_machine: input.washing_machine,
        bed_type: input.bed_type,
        restroom: input.restroom,
        wifi_available: input.wifi_available,
        max_adult: input.max_adult,
        max_children: input.max_children,
      };
      const room_newIssue = await prisma.room.update({
        where: { room_id: input.room_id },
        data: RoomUpdateData,
      });
      if (!room_newIssue) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "room not found",
        });
      }
      return room_newIssue;
    }),
  delete: publicProcedure
    .input(z.object({ room_id: z.string() }))
    .mutation(async ({ input }) => {
      const room = await prisma.room.delete({
        where: { room_id: input.room_id },
      });
      if (!room) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "room not found",
        });
      }
    }),
});

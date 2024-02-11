import prisma from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const roomRouter = router({
  findMany: publicProcedure
    .input(z.object({ room_id: z.string() }))
    .query(async ({ input }) => {
      const getRoom = await prisma.room.findMany({
        where: { room_id: input.room_id },
      });
      if (!getRoom) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "room not found",
        });
      }
      return getRoom;
    }),
  create: publicProcedure
    .input(
      z.object({
        accomodation_id: z.string(),
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
        max_resident_no: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const room = await prisma.room.create({
          data: {
            accommodation_id: input.accomodation_id,
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
            max_resident_no: input.max_resident_no,
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
        max_resident_no: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const room_newIssue = await prisma.room.update({
        where: { room_id: input.room_id },
        data: {
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
          max_resident_no: input.max_resident_no,
        },
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

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const chatRoomRouter = router({
  create: publicProcedure
    .input(
      z.object({
        host_id: z.string(),
        traveler_id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { host_id, traveler_id } = input;

      try {
        // Check if the chat room already exists for the given host_id and traveler_id
        const existingChatRoom = await prisma.chatroom.findFirst({
          where: {
            host_id,
            traveler_id,
          },
        });

        // If a chat room already exists, return the existing chat room
        if (existingChatRoom) {
          return existingChatRoom;
        }

        // If no chat room exists, create a new one
        const newChatRoom = await prisma.chatroom.create({
          data: {
            host_id,
            traveler_id,
          },
        });

        return newChatRoom;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating chat room",
        });
      }
    }),
  get: publicProcedure
    .input(
      z.object({
        traveler_id: z.string().optional(),
        host_id: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { traveler_id, host_id } = input;

      if (!traveler_id && !host_id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Both traveler_id and host_id can't be null",
        });
      }

      try {
        if (traveler_id && host_id) {
          const chatRoom = await prisma.chatroom.findMany({
            where: {
              host_id,
              traveler_id,
            },
          });
          if (!chatRoom) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Chat room not found",
            });
          }
          return chatRoom;
        }

        if (traveler_id && !host_id) {
          return await prisma.chatroom.findMany({
            where: {
              traveler_id: input.traveler_id,
            },
            orderBy: {
              updatedAt: "desc",
            },
          });
        }

        if (!traveler_id && host_id) {
          return await prisma.chatroom.findMany({
            where: {
              host_id,
            },
            orderBy: {
              updatedAt: "desc",
            },
          });
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching chat rooms",
        });
      }
    }),

  find: publicProcedure
    .input(
      z.object({
        traveler_id: z.string(),
        host_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { traveler_id, host_id } = input;

      if (!traveler_id || !host_id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Both traveler_id and host_id are required",
        });
      }

      try {
        const chatRoom = await prisma.chatroom.findFirst({
          where: {
            host_id,
            traveler_id,
          },
        });

        if (!chatRoom) {
          return null;
        }

        return { chatroom_id: chatRoom.chatroom_id };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error finding chat room",
        });
      }
    }),

  delete: publicProcedure
    .input(
      z.object({
        chatroom_id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { chatroom_id } = input;
      try {
        const deletedChatRoom = await prisma.chatroom.delete({
          where: {
            chatroom_id,
          },
        });
        return deletedChatRoom;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error deleting chat room",
        });
      }
    }),
});

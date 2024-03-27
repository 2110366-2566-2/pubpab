import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

// Procedure to handle GET requests
export const messageRouter = router({
  create: publicProcedure
    .input(
      z.object({
        chatroom_id: z.string(),
        sender_id: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { chatroom_id, sender_id, text } = input;

      try {
        // Create a new chat message
        const newMessage = await prisma.messages.create({
          data: {
            chatroom_id,
            sender_id,
            text,
          },
        });

        return newMessage;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating chat message",
        });
      }
    }),
  get: publicProcedure
    .input(
      z.object({
        chatroom_id: z.string(),
        page: z.number().optional().default(0),
      }),
    )
    .query(async ({ input }) => {
      const { chatroom_id, page } = input;
      const pageSize = 50;
      const skip = page * pageSize;

      try {
        // Fetch messages from the specified chat room
        const messages = await prisma.messages.findMany({
          where: {
            chatroom_id,
          },
          orderBy: {
            timestamp: "desc",
          },
          select: {
            message_id: true,
            sender_id: true,
            text: true,
          },
          take: pageSize,
          skip,
        });

        return messages;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching messages",
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
        // Delete all messages associated with the specified chat room
        const deletedMessages = await prisma.messages.deleteMany({
          where: {
            chatroom_id,
          },
        });
        return deletedMessages;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error deleting messages",
        });
      }
    }),
});

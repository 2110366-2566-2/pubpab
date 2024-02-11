import prisma from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

export const hostProfileRouter = router({
  findMany: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const getHostWithUser = await prisma.host.findMany({
        where: input.id
          ? {
              host_id: input.id,
            }
          : undefined, // Conditionally add where clause for findUnique
        select: {
          bank_account: true,
          users: {
            select: {
              first_name: true,
              last_name: true,
              phone_no: true,
              banner: true,
            },
          },
          accommodation: {
            select: {
              accommodation_id: true,
              banner: true,
              accommodation_status: true,
              name_a: true,
            },
          },
        },
      });
      if (!getHostWithUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Host not found",
        });
      }
      return getHostWithUser;
    }),
  update: publicProcedure
    .input(
      z.object({
        host_id: z.string(),
        bank_account: z.string().optional(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        phone_no: z.string().optional(),
        banner: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const hostUpdateData = {
        bank_account: input.bank_account,
      };
      const userUpdateData = {
        first_name: input.first_name,
        last_name: input.last_name,
        phone_no: input.phone_no,
        banner: input.banner,
        email: input.email,
        password: input.password ? await hash(input.password, 12) : undefined,
      };
      const host_newIssue = await prisma.host.update({
        where: { host_id: input.host_id },
        data: hostUpdateData,
      });
      if (!host_newIssue) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Host not found",
        });
      }
      const user_newIssue = await prisma.users.update({
        where: { user_id: input.host_id },
        data: userUpdateData,
      });
      if (!user_newIssue) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return { host_newIssue, user_newIssue };
    }),
});

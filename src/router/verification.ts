import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

export const verificationRouter = router({
  getUnverifiedHosts: publicProcedure.query(async () => {
    const getHostWithUser = await prisma.host.findMany({
      where: {
        admin_id: null,
      },
      select: {
        host_id: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            phone_no: true,
            banner: true,
          },
        },
      },
    });
    if (!getHostWithUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "All host verified",
      });
    }
    return getHostWithUser;
  }),
  getHost: publicProcedure
    .input(z.object({ host_id: z.string().optional() }))
    .query(async ({ input }) => {
      const getHostWithUser = await prisma.host.findMany({
        where: input.host_id
          ? {
              host_id: input.host_id,
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
              birth_date: true,
              citizen_id: true,
            },
          },
          accommodation: {
            select: {
              accommodation_id: true,
              banner: true,
              // accommodation_status: true,
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
  verifyHost: publicProcedure
    .input(z.object({ admin_id: z.string(), host_id: z.string() }))
    .mutation(async ({ input }) => {
      const host_newIssue = await prisma.host.update({
        where: { host_id: input.host_id },
        data: { admin_id: input.admin_id },
      });
      if (!host_newIssue) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Admin/Host not found",
        });
      }
      return host_newIssue;
    }),
});

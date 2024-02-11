import prisma from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

export const travelerProfileRouter = router({
  findMany: publicProcedure
    .input(z.object({ traveler_id: z.string() }))
    .query(async ({ input }) => {
      const gettravelerWithUser = await prisma.traveler.findMany({
        where: input.traveler_id
          ? {
              traveler_id: input.traveler_id,
            }
          : undefined,
        select: {
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
      if (!gettravelerWithUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "traveler not found",
        });
      }
      return gettravelerWithUser;
    }),
  update: publicProcedure
    .input(
      z.object({
        traveler_id: z.string(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        phone_no: z.string().optional(),
        banner: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const user_newIssue = await prisma.users.update({
        where: { user_id: input.traveler_id },
        data: {
          first_name: input.first_name,
          last_name: input.last_name,
          phone_no: input.phone_no,
          banner: input.banner,
          email: input.email,
          password_hash: input.password
            ? await hash(input.password, 12)
            : undefined,
        },
      });
      if (!user_newIssue) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }
      return user_newIssue;
    }),
});

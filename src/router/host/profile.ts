import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { prisma } from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const hostProfileRouter = router({
  find: publicProcedure
    .input(
      z.object({
        host_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const host = await prisma.host.findUnique({
        where: { host_id: input.host_id },
        select: {
          bank_account: true,
          users: {
            select: {
              first_name: true,
              last_name: true,
              phone_no: true,
              banner: true,
              email: true,
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
      if (!host) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Host not found",
        });
      }
      return host;
    }),
  findMany: publicProcedure
    .input(
      z.object({
        host_id: z.string().optional(),
      }),
    )
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
              email: true,
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
  create: publicProcedure
    .input(
      z.object({
        citizen_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        password: z.string(),
        birth_date: z.date(),
        phone_no: z.string(),
        gender: z.enum(["M", "F"]),
        banner: z.string().optional(),
        user_type: z.enum(["Hosts"]),
        bank_account: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const newUser = await prisma.users.create({
          data: {
            citizen_id: input.citizen_id,
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            password_hash: await hash(input.password, 12),
            birth_date: input.birth_date,
            age: calculateAge(input.birth_date),
            phone_no: input.phone_no,
            gender: input.gender,
            banner: input.banner,
            user_type: input.user_type,
          },
        });
        const newHost = await prisma.host.create({
          data: {
            host_id: newUser.user_id,
            admin_id: null,
            bank_account: input.bank_account,
          },
        });
        return { newUser, newHost };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error during user creation",
        });
      }
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

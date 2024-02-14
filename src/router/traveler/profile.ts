import prisma from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

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
        user_type: z.enum(["Travelers"]),
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
        const newTraveler = await prisma.traveler.create({
          data: {
            traveler_id: newUser.user_id,
          },
        });
        return { newUser, newTraveler };
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

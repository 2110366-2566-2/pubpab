import prisma from "@/lib/client";
import { router, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        citizen_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        password: z.string(),
        birth_date: z.date(),
        age: z.number(),
        phone_no: z.string(),
        gender: z.enum(["M", "F"]),
        banner: z.string().optional(),
        user_type: z.enum(["Admins", "Travelers", "Hosts"]),
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
            age: input.age,
            phone_no: input.phone_no,
            gender: input.gender,
            banner: input.banner,
            user_type: input.user_type,
          },
        });
        return newUser;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error during user creation",
        });
      }
    }),
});

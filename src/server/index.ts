import { accomodationRouter } from "@/router/host/accom";
import { publicProcedure, router } from "./trpc";
import { hostProfileRouter } from "@/router/host/profile";
import { roomRouter } from "@/router/host/room";
import { travelerProfileRouter } from "@/router/traveler/profile";
import { paymentRouter } from "@/router/payment";
import { userRouter } from "@/router/user";
import { verificationRouter } from "@/router/verification";

export const appRouter = router({
  host: router({
    accomodation: accomodationRouter,
    profile: hostProfileRouter,
    room: roomRouter,
  }),
  traveler: router({
    profile: travelerProfileRouter,
  }),
  payment: paymentRouter,
  user: userRouter,
  verification: verificationRouter,
});

export type AppRouter = typeof appRouter;

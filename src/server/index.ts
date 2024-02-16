import { accomodationRouter } from "@/router/host/accom";
import { hostProfileRouter } from "@/router/host/profile";
import { roomRouter } from "@/router/host/room";
import { paymentRouter } from "@/router/payment";
import { travelerProfileRouter } from "@/router/traveler/profile";
import { userRouter } from "@/router/user";
import { verificationRouter } from "@/router/verification";

import { router } from "./trpc";

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

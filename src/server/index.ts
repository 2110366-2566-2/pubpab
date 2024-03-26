import { accomodationRouter } from "@/router/host/accom";
import { hostNotificationRouter } from "@/router/host/notification";
import { hostProfileRouter } from "@/router/host/profile";
import { hostReservationRouter } from "@/router/host/reservation";
import { roomRouter } from "@/router/host/room";
import { paymentRouter } from "@/router/payment";
import { feedbackRouter } from "@/router/review";
import { searchRouter } from "@/router/search";
import { travelerNotificationRouter } from "@/router/traveler/notification";
import { travelerProfileRouter } from "@/router/traveler/profile";
import { travelerReservationRouter } from "@/router/traveler/reservation";
import { userRouter } from "@/router/user";
import { verificationRouter } from "@/router/verification";

import { router } from "./trpc";

export const appRouter = router({
  host: router({
    accomodation: accomodationRouter,
    profile: hostProfileRouter,
    room: roomRouter,
    notification: hostNotificationRouter,
    reservation: hostReservationRouter,
  }),
  traveler: router({
    profile: travelerProfileRouter,
    reservation: travelerReservationRouter,
    notification: travelerNotificationRouter,
  }),
  payment: paymentRouter,
  user: userRouter,
  verification: verificationRouter,
  review: feedbackRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;

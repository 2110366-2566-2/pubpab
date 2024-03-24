"use client";

import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import EastHotelImage from "@/../../public/easthotel.jpeg";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import getStripe from "@/lib/get-stripe"; // Import the getStripe function
import { useRouter } from "next/navigation";

const ReserveBookingCard = ({
  host_id,
  accomName,
  room_id,
  roomName,
  price,
  //   adult,
  //   child,
  location,
  checkInDate,
  checkOutDate,
}: {
  host_id: string;
  accomName: string;
  room_id: string;
  roomName: string;
  price: number;
  //   adult: string;
  //   child: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
  // const { data: session } = useSession();

  const createPayment = trpc.payment.create.useMutation();
  const createCheckout = trpc.payment.createCheckout.useMutation();
  const router = useRouter();
  // const traveler_id = session?.user?.id || "";

  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  const durations = differenceInDays(endDate, startDate);
  const totalPrice = price * durations;
  async function onContinuePayment() {
    const response = await createCheckout.mutateAsync({
      amount: totalPrice * 100,
    });
    const payment = await createPayment.mutateAsync({
      amount: totalPrice,
      host_bank_account: "11111111",
    });
    const stripe = await getStripe();
    if (stripe) {
      const elements = stripe.elements({
        clientSecret: response?.client_secret || "",
        loader: "auto",
      });
      const paymentElement = elements?.create("payment", {
        layout: { type: "tabs" },
      });
      // paymentElement.mount("#payment-element");
    } else {
      throw new Error("none stripe check id again");
    }
    await router.push(`/checkout?
    checkInDate=${checkInDate.toString()}&
    checkOutDate=${checkOutDate.toString()}&
    room_id=${room_id}&
    host_id=${host_id}&
    price=${price.toString()}&
    paymentId=${payment.newPayment.payment_id}
    `);
  }
  //   const payment = await createPayment.mutateAsync({
  //     amount: totalPrice,
  //     host_bank_account: "11111111",
  //   });
  //   router.push({
  //     pathname: '/payment',
  //     query: { payment_id: payment.newPayment.payment_id },
  //   })
  // const travelerReserve = await createTravelerReserve.mutateAsync({
  //   room_id: room_id,
  //   traveler_id: traveler_id,
  //   payment_id: payment.newPayment.payment_id,
  //   start_date: new Date(checkInDate),
  //   end_date: new Date(checkOutDate),
  // });

  // await createTravelerNotification.mutateAsync({
  //   user_id: traveler_id,
  //   reservation_id: travelerReserve.reservation_id,
  //   notification_type: "Reservation",
  // });

  // await createHostNotification.mutateAsync({
  //   user_id: host_id,
  //   reservation_id: travelerReserve.reservation_id,
  //   notification_type: "Reservation",
  // });
  // }
  return (
    <div className="relative flex flex-row gap-2 rounded-lg bg-white shadow-md">
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-row justify-between">
          <span>
            <h2 className="mb-2  text-xl">{accomName}</h2>
            <h1 className="mb-2 text-2xl font-semibold">{roomName}</h1>
            <h4 className="mb-2  text-xl">{location}</h4>
            <Image
              src={EastHotelImage}
              alt="hotel"
              className="max-w-md rounded-lg object-scale-down"
            />
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-row justify-between">
          <span>
            <h2 className="mb-2  text-xl">Total</h2>
            {/* <h1 className="mb-2 text-2xl font-semibold">฿{price}</h1> */}
            <p className="pb-4 text-2xl font-bold">฿{totalPrice} </p>
            <div className="flex flex-row justify-between">
              <LogInIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              <h1 className="pb-1 font-semibold">{checkInDate}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <LogOutIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              <h1 className="pb-1 font-semibold"> {checkOutDate}</h1>
            </div>
          </span>
        </div>
        <div className="flex h-full flex-row justify-between pt-4">
          {/* <span className="flex w-3/4 flex-row gap-16">
            <div className="flex flex-row gap-5  ">
              <h1 className="pb-1 font-semibold">{checkInDate}</h1>
              <h1 className="pb-1 font-semibold">{checkOutDate}</h1>
            </div>
          </span> */}
          <span className="flex items-end justify-end p-4 text-center">
            {/* <Link
              href={{
                pathname: "/checkout",
                query: {
                  checkInDate: checkInDate.toString(),
                  checkOutDate: checkOutDate.toString(),
                  room_id: room_id,
                  host_id: host_id,
                  price: totalPrice.toString(),
                },
              }}
            > */}
            <button
              // type="submit"
              onClick={onContinuePayment}
              className="h-10 rounded-lg bg-blue-500 px-10 text-white hover:bg-blue-600"
            >
              Continue payment
            </button>
            {/* </Link> */}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ReserveBookingCard;

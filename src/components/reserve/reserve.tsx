"use client";

import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import EastHotelImage from "@/../../public/easthotel.jpeg";
import { trpc } from "@/lib/trpc/client";
import { differenceInDays } from "date-fns";
import getStripe from "@/lib/get-stripe";
import { useSession } from "next-auth/react";

const ReserveBookingCard = ({
  host_id,
  room_id,
  accom_id,
  accomName,
  roomName,
  price,
  //   adult,
  //   child,
  location,
  checkInDate,
  checkOutDate,
}: {
  host_id: string;
  room_id: string;
  accom_id: string;
  accomName: string;
  roomName: string;
  price: number;
  //   adult: string;
  //   child: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
  const { data: session } = useSession();

  const createPayment = trpc.payment.create.useMutation();
  const createCheckout = trpc.payment.createCheckout.useMutation();
  const hostInfo = trpc.host.profile.find.useQuery({ host_id: host_id || "" });
  const traveler_id = session?.user?.id || "";

  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  const durations = differenceInDays(endDate, startDate);
  const totalPrice = price * durations;

  async function onContinuePayment() {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error("none stripe check id again");
    }
    const payment = await createPayment.mutateAsync({
      amount: totalPrice,
      host_bank_account: hostInfo.data?.bank_account || "",
    });
    const response = await createCheckout.mutateAsync({
      room_id: room_id,
      accom_id: accom_id,
      amount: totalPrice,
      accom_name: accomName,
      room_name: roomName,
      host_id: host_id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      traveler_id: traveler_id,
      payment_id: payment.newPayment.payment_id,
    });
    await stripe.redirectToCheckout({ sessionId: response.id });
  }

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
            <button
              type="submit"
              onClick={onContinuePayment}
              className="h-10 rounded-lg bg-blue-500 px-10 text-white hover:bg-blue-600"
            >
              Continue payment
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ReserveBookingCard;

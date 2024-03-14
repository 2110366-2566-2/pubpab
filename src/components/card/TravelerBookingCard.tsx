import Image from "next/image";

import EastHotelImage from "@/../../public/easthotel.jpeg";
import CancelReservationButton from "../booking/CancelButton";
import { LogInIcon, LogOutIcon } from "lucide-react";

const TravelerBookingCard = ({
  accomName,
  roomName,
  price,
  adult,
  child,
  reservation_id,
  host_id,
  traveler_id,
  checkInDate,
  checkOutDate,
}: {
  accomName: string;
  roomName: string;
  price: string;
  adult: string;
  child: string;
  checkInDate: string;
  checkOutDate: string;
  reservation_id: string;
  host_id: string;
  traveler_id: string;
}) => {
  return (
    <div className="relative flex flex-row gap-2 rounded-lg bg-white shadow-md">
      <Image
        src={EastHotelImage}
        alt="hotel"
        className="max-w-md rounded-lg object-scale-down"
      />
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-row justify-between">
          <span>
            <h2 className="mb-2  text-xl">{accomName}</h2>
            <h1 className="mb-2 text-2xl font-semibold">{roomName}</h1>
          </span>
          <span className="flex flex-col text-right">
            <p className="pb-4 text-2xl font-bold">฿{price} </p>

            <p>{adult} Adults</p>
            <p>{child} Children</p>
          </span>
        </div>

        <div className="mb-0 flex flex-row justify-between pb-0 pt-4">
          <span className="flex h-auto w-3/4 flex-row items-center gap-16">
            <div className="flex flex-row items-center gap-5">
              <LogInIcon size={24} />
              <h1 className="pb-1 font-semibold">{checkInDate}</h1>
              <LogOutIcon size={24} />
              <h1 className="pb-1 font-semibold">{checkOutDate}</h1>
            </div>
          </span>
          <span className="flex items-end justify-end p-4 text-center">
            <CancelReservationButton
              reservation_id={reservation_id}
              host_id={host_id}
              traveler_id={traveler_id}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
export default TravelerBookingCard;

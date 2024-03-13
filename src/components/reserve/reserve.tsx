import Image from "next/image";

import EastHotelImage from "@/../../public/easthotel.jpeg";

const ReserveBookingCard = ({
  accomName,
  roomName,
  price,
  //   adult,
  //   child,
  location,
  checkInDate,
  checkOutDate,
}: {
  accomName: string;
  roomName: string;
  price: string;
  //   adult: string;
  //   child: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
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
            <p className="pb-4 text-2xl font-bold">฿{price} </p>
            <h1 className="pb-1 font-semibold">{checkInDate}</h1>
            <h1 className="pb-1 font-semibold">{checkOutDate}</h1>
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
            <button className="h-10 rounded-lg bg-blue-500 px-10 text-white hover:bg-blue-600">
              Continue payemnt
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ReserveBookingCard;

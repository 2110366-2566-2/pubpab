import Image from "next/image";

import EastHotelImage from "@/../../public/easthotel.jpeg";
import UserImage from "@/../../public/User.png";

const HostBookingCard = ({
  accomName,
  roomName,
  price,
  adult,
  child,
  firstname,
  lastname,
  checkInDate,
  checkOutDate,
}: {
  accomName: string;
  roomName: string;
  price: string;
  adult: string;
  child: string;
  firstname: string;
  lastname: string;
  checkInDate: string;
  checkOutDate: string;
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
            <div className="flex flex-row items-center gap-4">
              <Image
                src={UserImage}
                alt="User"
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p>
                  {firstname} {lastname}
                </p>
              </div>
            </div>
          </span>
          <span className="flex flex-col text-right">
            <p className="pb-4 text-2xl font-bold">฿{price} </p>

            <p>{adult} Adults</p>
            <p>{child} Children</p>
          </span>
        </div>

        <div className="flex h-full flex-row justify-between pt-4">
          <span className="flex w-3/4 flex-row gap-16">
            <div className="flex flex-row gap-5  ">
              <h1 className="pb-1 font-semibold">{checkInDate}</h1>
              <h1 className="pb-1 font-semibold">{checkOutDate}</h1>
            </div>
          </span>
          <span className="flex items-end justify-end p-4 text-center">
            {/* <button className="h-10 rounded-lg bg-red-500 px-12 text-white hover:bg-red-600">
              Cancel
            </button> */}
          </span>
        </div>
      </div>
    </div>
  );
};
export default HostBookingCard;

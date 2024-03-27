import Image from "next/image";

import EastHotelImage from "@/../../public/easthotel.jpeg";
import UserImage from "@/../../public/User.png";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { getImageUrlFromS3 } from "@/lib/s3";
import { useState, useEffect } from "react";

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
  accommodation_id,
  banner,
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
  accommodation_id: string;
  banner: string;
}) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const b = await getImageUrlFromS3(
        "accommodation/" + accommodation_id + "/" + banner,
      );
      setUrl(b);
    };
    fetchData();
    console.log(url);
  });
  return (
    <div className="relative flex flex-row gap-2 rounded-lg bg-white shadow-md">
      <Image
        src={url}
        alt="hotel"
        className="max-w-md rounded-lg object-scale-down"
        width={500}
        height={500}
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
          <span className="flex w-3/4 flex-row items-center gap-16">
            <div className="flex flex-row items-center gap-5">
              <LogInIcon size={24} />
              <h1 className="pb-1 font-semibold">{checkInDate}</h1>
              <LogOutIcon size={24} />
              <h1 className="pb-1 font-semibold">{checkOutDate}</h1>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
export default HostBookingCard;

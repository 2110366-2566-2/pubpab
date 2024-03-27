import { CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getImageUrlFromS3 } from "@/lib/s3";

const RoomInfoCard = ({
  accomName,
  roomName,
  banner,
  floor,
  room,
  bed,
  price,
  adult,
  child,
  room_id,
  accom_id,
  smoking,
  noise,
  pet,
  washing_machine,
  restroom,
  wifi_available,
  checkInDate,
  checkOutDate,
}: {
  accomName: string;
  roomName: string;
  banner: string;
  floor: number;
  room: string;
  bed: string;
  price: number;
  adult: number;
  child: number;
  room_id: string;
  accom_id: string;
  smoking: boolean;
  noise: boolean;
  pet: boolean;
  washing_machine: boolean;
  restroom: boolean;
  wifi_available: boolean;
  checkInDate: string;
  checkOutDate: string;
}) => {
  const imageUrl = "accommodation/" + accom_id + "/" + room_id + "/" + banner;
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const b = await getImageUrlFromS3(imageUrl);
      setUrl(b);
    };
    fetchData();
  });

  function checkValid(b: boolean) {
    if (b) return <CheckIcon />;
    return <XIcon />;
  }
  return (
    <div className="relative flex flex-row gap-2 rounded-lg bg-white shadow-md">
      <Image
        src={url.toString()}
        alt="hotel"
        width="1920"
        height="1080"
        className="max-w-md rounded-lg object-scale-down"
      />
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-row justify-between">
          <span>
            <h2 className="mb-2  text-xl">{accomName}</h2>
            <h1 className="mb-2 text-2xl font-semibold">{roomName}</h1>
            <div className="flex flex-row justify-between gap-20">
              <span>
                <p>Floor {floor}</p>
                <p>Room No. {room}</p>
              </span>
              <span>{bed}</span>
            </div>
          </span>
          <span className="flex flex-col text-right">
            <p className="pb-4 text-2xl font-bold">฿ {price}/Night</p>
            <p>{adult} Adults</p>
            <p>{child} Children</p>
          </span>
        </div>
        <div className="flex h-full flex-row justify-between pt-4">
          <span className="flex w-3/4 flex-row gap-16">
            <div className="flex flex-col">
              <h1 className="pb-1 font-semibold">Allow</h1>
              <p className="flex flex-row gap-1">
                {checkValid(pet)}
                Pet
              </p>
              <p className="flex flex-row gap-1">
                {checkValid(noise)}
                Noise
              </p>
              <p className="flex flex-row gap-1">
                {checkValid(smoking)}
                Smoking
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="pb-1 font-semibold">Facility</h1>
              <p className="flex flex-row gap-1">
                {checkValid(wifi_available)}
                Wifi
              </p>
              <p className="flex flex-row gap-1">
                {checkValid(restroom)}
                Restroom
              </p>
              <p className="flex flex-row gap-1">
                {checkValid(washing_machine)}
                Washing Machine
              </p>
            </div>
          </span>
          <span className="flex items-end justify-end p-4 text-center">
            <Link
              href={{
                pathname: "/reserve",
                query: {
                  checkInDate: checkInDate.toString(),
                  checkOutDate: checkOutDate.toString(),
                  room_id: room_id,
                  accom_id: accom_id,
                },
              }}
            >
              <button className="h-10 rounded-lg bg-gray-200 px-12 hover:bg-gray-300">
                Reserve
              </button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default RoomInfoCard;

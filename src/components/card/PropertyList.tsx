import Image from "next/image";
import { StarIcon } from "lucide-react";

import EastHotelImage from "@/../../public/easthotel.jpeg";

const PropertyListCard = ({
  name,
  location,
  description,
  stars,
  price,
}: {
  name: string;
  location: string;
  description: string;
  stars: number;
  price: number;
}) => {
  return (
    <div className="relative flex flex-row rounded-lg bg-white shadow-md">
      <Image
        src={EastHotelImage}
        alt="hotel"
        className="max-w-xs rounded-l-lg object-scale-down"
      />
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-row justify-between">
          <span>
            <h1 className="mb-2 text-xl font-semibold">{name}</h1>
            <h2 className="text-gray-600">{location}</h2>
          </span>
          <span className="inline-flex h-10 items-center gap-x-1.5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white">
            <StarIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            {stars}
          </span>
        </div>
        <div className="flex h-full flex-row justify-between pt-4">
          <span className="flex w-3/4 flex-col rounded-xl border border-blue-300 p-2 px-4 text-blue-300">
            <h1>Description:</h1>
            <p>{description}</p>
          </span>
          <span className="flex flex-col justify-end text-center">
            <h1>Avg Price</h1>
            <p className="text-2xl font-bold">฿ {price}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
export default PropertyListCard;

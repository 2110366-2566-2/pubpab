import Image from "next/image";
import EastHotelImage from "@/../../public/easthotel.jpeg";
import starNotFill from "@/../../public/Star.svg";
import starFill from "@/../../public/StarFill.svg";
import { getImageUrlFromS3 } from "@/lib/s3";
import { useEffect, useState } from "react";

const ReadReviewCard = ({
  accomName,
  roomName,
  location,
  imageURL,
  rating,
  reviewDescription,
  reviewDate,
}: {
  accomName: string;
  roomName: string;
  location: string;
  imageURL?: any;
  rating: number;
  reviewDescription: string;
  reviewDate?: string;
}) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const b = await getImageUrlFromS3(imageURL);
      setUrl(b);
    };
    fetchData();
  });
  const renderStars = () => {
    const starImages = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starImages.push(
          <Image
            key={i}
            src={starFill}
            alt="Filled Star"
            className="h-6 w-6"
          />,
        );
      } else {
        starImages.push(
          <Image
            key={i}
            src={starNotFill}
            alt="Filled Star"
            className="h-6 w-6"
          />,
        );
      }
    }
    return starImages;
  };

  const dateDiffInDays = (a: string, b: string) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    const diffInTime = dateB.getTime() - dateA.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  };
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
            <p className="text-l">{location}</p>
            <div className="mb-2 mt-2 flex items-center">{renderStars()}</div>
            {/* <div className="flex flex-row gap-2">
              <span>
                Stay Duration: {dateDiffInDays(checkInDate, checkOutDate)} days
              </span>
            </div> */}
            <div className="rounded-lg bg-gray-100 p-4">
              <div className="mb-6">
                <p>"{reviewDescription}"</p>
              </div>
              <p className="text-gray-400">Review Date: {reviewDate}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ReadReviewCard;

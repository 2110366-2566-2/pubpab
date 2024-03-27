"use client";

import Image from "next/image";
import Link from "next/link";
import { LogInIcon, LogOutIcon, StarIcon, CheckIcon } from "lucide-react";
import RoomInfoCard from "@/components/card/RoomInfoCard";
import { MapViewOnly } from "@/components/GoogleMapView";
import EastHotelImage from "@/../../public/easthotel.jpeg";
import { trpc } from "@/lib/trpc/client";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import LoadingScreen from "@/components/ui/loading-screen";
import ReadReviewCard from "@/components/review/readReview";
import { getImageUrlFromS3 } from "@/lib/s3";
import { router } from "@/server/trpc";
import { useRouter } from "next/navigation";

const PropInformation = ({
  host_id,
  accom_id,
  accom_name,
  accom_description,
  accom_banner,
  accom_address,
  accom_distinct,
  accom_city,
  accom_province,
  accom_postal_code,
  accom_rating,
  accom_ggmap_link,
  checkInDate,
  checkOutDate,
}: {
  host_id: string;
  accom_id: string;
  accom_name: string;
  accom_description: string;
  accom_banner: string;
  accom_address: string;
  accom_distinct: string;
  accom_city: string;
  accom_province: string;
  accom_postal_code: string;
  accom_rating: number;
  accom_ggmap_link: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
  const [url, setUrl] = useState<String>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const b = await getImageUrlFromS3(
        "accommodation/" + accom_id + "/" + accom_banner,
      );
      setUrl(b);
    };
    fetchData();
  });

  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (checkInDate) {
      return new Date(checkInDate);
    }
    return new Date();
  });
  const [date2, setDate2] = React.useState<Date | undefined>(() => {
    if (checkOutDate) {
      return new Date(checkOutDate);
    }
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Adding one day
    return tomorrow;
  });
  const findAccommodation = trpc.host.accomodation.findUnique.useQuery({
    accommodation_id: accom_id ? accom_id : "",
  });

  const findRooms = trpc.host.room.findMany.useQuery({
    accommodation_id: accom_id || "",
  });

  if (findRooms.error) {
    return <div>Error: {findRooms.error.message}</div>;
  }

  const fetchReviews = trpc.review.accommodationReviews.useQuery({
    accommodation_id: accom_id || "",
  });

  if (fetchReviews.error) {
    return <div>Error: {fetchReviews.error.message}</div>;
  }

  if (findAccommodation.error) {
    return <div>Error: {findAccommodation.error.message}</div>;
  }

  if (
    findRooms.isLoading ||
    findAccommodation.isLoading ||
    fetchReviews.isLoading
  ) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  const reviewsData = fetchReviews.data;
  const roomsData = findRooms.data;

  const Info = roomsData.flatMap((entry) =>
    entry.room.map((room) => ({
      room_id: room.room_id,
      accomName: accom_name,
      roomName: room.room_name,
      banner: room.banner,
      price: room.price,
      room: room.room_no,
      floor: room.floor,
      bed: room.bed_type,
      adult: room.max_adult,
      children: room.max_children,
      smoking: room.smoking,
      noise: room.noise,
      pet: room.pet,
      wifi_available: room.wifi_available,
      washing_machine: room.washing_machine,
      restroom: room.restroom,
      googlemap_link: accom_ggmap_link,
    })),
  );

  console.log(url);

  // let reviewData;
  // if (reviewsData != null) {
  //   reviewData = reviewsData.map((review) =>
  //     review.accommodation.room.map((room) => ({
  //       accomName: review.accommodation.name_a,
  //       location: review.accommodation.address_a,
  //       roomName: room.room_name,
  //       imageURL: review.picture,
  //       rating: review.score,
  //       reviewDescription: review.text,
  //       reviewDate: review.timestamp,
  //     })),
  //   );
  // } else {
  //   reviewData = {};
  // }
  const reviewData = reviewsData ? (
    <>
      {reviewsData.map((review, index) => (
        <ReadReviewCard
          key={index}
          accomName={review.reserve.room.accommodation?.name_a ?? ""}
          roomName={review.reserve.room.room_name}
          location={review.reserve.room.accommodation?.address_a ?? ""}
          imageURL={review.picture}
          rating={review.score || 0}
          reviewDescription={review.text || "No review"}
          reviewDate={review.timestamp?.toString() || ""}
        />
      ))}
    </>
  ) : null;

  function ToChatPage() {
    router.push(`../chat?host_id=${host_id}`);
  }

  return (
    <>
      <header className="flex h-20 w-full flex-row items-center justify-center bg-blue-900">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <Popover>
            <PopoverTrigger
              asChild
              className="relative inline-flex items-center gap-x-1.5 rounded-none bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <Button
                variant={"outline"}
                className={cn(
                  "w-40 justify-start rounded-l-md text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <LogInIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger
              asChild
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-none bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <Button
                variant={"outline"}
                className={cn(
                  "w-40 justify-start rounded-r-md text-left font-normal",
                  !date2 && "text-muted-foreground",
                )}
              >
                <LogOutIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                {date2 ? format(date2, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                fromDate={date}
                mode="single"
                selected={date2}
                onSelect={setDate2}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </span>
      </header>
      <section className="mx-auto mb-4 max-w-7xl px-4">
        <div className="flex w-full items-center justify-between py-4">
          <a href="/searchprop">
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Back
            </button>
          </a>
          <button
            onClick={() => {
              ToChatPage();
            }}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Chat with host
          </button>
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-green-600/20">
            <StarIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            {accom_rating}
          </span>
        </div>
        <div className="w-full overflow-hidden rounded-lg border-2 border-gray-100 bg-white shadow">
          <Image
            src={url.toString()}
            alt=""
            className="h-64 object-cover"
            width="1920"
            height="1080"
          />
          <div className="flex flex-row gap-8 px-8 pb-4 pt-8">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                Name: {accom_name}
              </h2>
              <p className="text-base font-normal text-gray-900">
                Location: {accom_address} {accom_distinct} {accom_city}{" "}
                {accom_province} {accom_postal_code}
              </p>
              <div className="mt-4">
                <span className="flex min-h-60 flex-col rounded-xl border border-blue-300 p-2 px-4 text-blue-300">
                  <h1>Description:</h1>
                  <p>{accom_description}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              {/* <div className="flex flex-1 flex-row items-center justify-center rounded-lg bg-blue-900 text-center"> */}
              <MapViewOnly MapURL={accom_ggmap_link || ""} />
              {/* <p className="text-base font-semibold text-white">Google Map</p> */}
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-col gap-4 px-8 py-4">
            <h2 className="text-xl font-bold text-gray-900">Rooms</h2>
            {Info.flatMap(
              (items: {
                noise: boolean;
                pet: boolean;
                washing_machine: boolean;
                restroom: boolean;
                wifi_available: boolean;
                smoking: boolean;
                room_id: string | null;
                accomName: string | null;
                roomName: string | null;
                banner: string | null;
                price: number | null;
                floor: number | null;
                room: string | null;
                bed: string | null;
                adult: number | null;
                children: number | null;
              }) => (
                <RoomInfoCard
                  accomName={items.accomName ? items.accomName : ""}
                  roomName={items.roomName ? items.roomName : ""}
                  banner={items.banner ? items.banner : ""}
                  price={items.price ? items.price : 0}
                  floor={items.floor ? items.floor : 1}
                  room={items.room ? items.room : ""}
                  bed={items.bed ? items.bed : ""}
                  adult={items.adult ? items.adult : 0}
                  children={items.children ? items.children : 0}
                  room_id={items.room_id ? items.room_id : ""}
                  accom_id={accom_id ? accom_id : ""}
                  smoking={items.smoking || false}
                  noise={items.noise || false}
                  pet={items.pet || false}
                  washing_machine={items.washing_machine || false}
                  restroom={items.restroom || false}
                  wifi_available={items.wifi_available || false}
                  checkInDate={date?.toDateString() || ""}
                  checkOutDate={date2?.toDateString() || ""}
                />
              ),
            )}
            {/* <PropertyInfoCard accomName="mom" roomName="mom" price={100} floor={1} room={1} bed="mom" adult={1} children={1} /> */}
          </div>
          <div className="flex flex-col gap-4 px-8 py-4">
            <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
            {/* {reviewData.flatMap((review) => (
              <ReadReviewCard
                accomName={review.accommodation.name_a}
                roomName={review.accommodation.room.room_name}
                location={review.accommodation.address_a}
                imageURL={review.picture}
                checkInDate={review.accommodation.reserve.start_date}
                checkOutDate={review.accommodation.reserve.end_date}
                rating={review.score}
                reviewDescription={review.text}
                reviewDate={review.timestamp}
              />
            ))} */}
            <>{reviewData}</>
          </div>
        </div>
      </section>
    </>
  );
};

const PropInfo = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const accom_id = queryParameters.get("accom_id");
  const checkInDate = queryParameters.get("checkInDate");
  const checkOutDate = queryParameters.get("checkOutDate");

  const findAccommodation = trpc.host.accomodation.findUnique.useQuery({
    accommodation_id: accom_id ? accom_id : "",
  });

  if (findAccommodation.error) {
    return <div>Error: {findAccommodation.error.message}</div>;
  }

  if (findAccommodation.isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  const accomData = findAccommodation.data;

  return (
    <PropInformation
      host_id={accomData.host_id || ""}
      accom_id={accom_id || ""}
      accom_banner={accomData.banner || ""}
      accom_name={accomData.name_a}
      accom_description={accomData.description_a}
      accom_address={accomData.address_a}
      accom_distinct={accomData.distinct_a}
      accom_city={accomData.city}
      accom_province={accomData.province}
      accom_postal_code={accomData.postal_code}
      accom_rating={accomData.rating}
      accom_ggmap_link={accomData.ggmap_link || ""}
      checkInDate={checkInDate || ""}
      checkOutDate={checkOutDate || ""}
    />
  );
};
export default PropInfo;

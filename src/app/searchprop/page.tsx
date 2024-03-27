"use client";

import {
  CompassIcon,
  LogInIcon,
  LogOutIcon,
  SearchIcon,
  StarIcon,
  Wallet2Icon,
} from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import PropertyListCard from "@/components/card/PropertyList";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import LoadingScreen from "@/components/ui/loading-screen";

const PropertyList = ({
  star,
  price,
  date,
  date2,
  range,
  nameFilter,
}: {
  star: number;
  price: number[];
  date: Date;
  date2: Date;
  range: number;
  nameFilter: string;
}) => {
  const filteredAccom = trpc.search.filter.useQuery({
    accom_name: nameFilter,
    rating: star,
    checkInDate: date,
    checkOutDate: date2,
    priceMin: price[0],
    priceMax: price[1],
    radius: undefined,
  });
  const accomData = filteredAccom.data?.map((e) => ({
    name: e.name_a,
    location: e.distinct_a,
    description: e.description_a,
    stars: e.rating,
    price: e.price,
    href: e.ggmap_link,
    accom_id: e.accommodation_id,
    banner: e.banner,
  }));

  console.log(accomData);
  return (
    <section className="flex justify-center ">
      <ul role="list" className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-5">
        {accomData?.map((desc) => (
          <Link
            href={{
              pathname: "searchprop/PropInfo",
              query: {
                accom_id: desc.accom_id,
                checkInDate: date?.toString(),
                checkOutDate: date2?.toString(),
              },
            }}
          >
            <li className="col-span-1 rounded-md shadow-sm">
              <PropertyListCard
                name={desc.name}
                location={desc.location}
                description={desc.description}
                imageUrl={"accommodation/" + desc.accom_id + "/" + desc.banner}
                stars={desc.stars}
                price={desc.price}
              />
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

const SearchProps = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [star, setStar] = React.useState<number | number[]>(0);
  const [price, setPrice] = React.useState<number[] | any>([0, 5000]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [date2, setDate2] = React.useState<Date | undefined>(tomorrow);
  const [range, setRange] = React.useState<number>(10);
  const [nameFilter, setNameFilter] = React.useState<string>("");

  return (
    <>
      <section className="flex h-20 w-full flex-row items-center justify-start bg-blue-900">
        <header className="flex h-40 w-full flex-row items-center justify-center gap-4 bg-blue-900">
          <section className="flex h-40 flex-col items-center justify-center gap-4">
            <div className="mx-10 w-full max-w-lg lg:max-w-2xl ">
              <div className="relative ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  type="search"
                />
              </div>
            </div>
            <div className="flex w-full max-w-2xl flex-row items-center justify-center gap-4">
              <span className=" flex w-2/5 rounded-md shadow-sm">
                <div className="flex w-full flex-row items-center justify-center gap-4 rounded-md border-0 bg-white px-2 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <StarIcon className="-mr-2 w-1/5" aria-hidden="true" />
                  <p className=" border-1 w-8 rounded-md border border-black p-0.5 text-center">
                    {star}
                  </p>
                  <Slider
                    dots={true}
                    step={1}
                    max={5}
                    min={0}
                    onChange={setStar}
                    className="w-3/5"
                  />
                </div>
              </span>
              <span className=" flex w-1/5 rounded-md shadow-sm">
                <div className="mx-2 w-full">
                  <div className="relative flex flex-row">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <CompassIcon
                        className="h-5 w-5 text-gray-600"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="radius"
                      name="radius"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-9 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={range}
                      type="number"
                      onChange={(e) => setRange(Number(e.target.value))}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
                      Km
                    </div>
                  </div>
                </div>
              </span>
              <span className="flex w-2/5 rounded-md shadow-sm">
                <span className="flex flex-row">
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className="inline-flex w-full items-center gap-x-1.5 rounded-none bg-white px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <Button
                        variant={"default"}
                        className={cn(
                          "w-30 justify-start rounded-l-md text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <LogInIcon
                          className="-ml-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        {date ? format(date, "P") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        fromDate={today}
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
                      className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-none bg-white px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <Button
                        variant={"default"}
                        className={cn(
                          "w-30 justify-start rounded-r-md text-left font-normal",
                          !date2 && "text-muted-foreground",
                        )}
                      >
                        <LogOutIcon
                          className="-ml-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        {date2 ? format(date2, "P") : <span>Pick a date</span>}
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
              </span>
            </div>
          </section>
          <section className="flex h-[92px] flex-col items-center justify-center">
            <div className=" flex h-full w-full max-w-xl flex-col items-center justify-center rounded-md border-0 bg-white px-5 py-2 text-gray-900 ring-1 ring-inset ring-gray-300">
              <span className="flex flex-row gap-1 pb-3">
                <Wallet2Icon />
                <p className="ml-1 w-10">{price[0]}</p>
                <p>-</p>
                <p className="w-10">{price[1]}</p>
              </span>
              <Slider
                range
                min={0}
                max={50000}
                step={100}
                defaultValue={price}
                onChange={setPrice}
                allowCross={false}
                className="w-full"
              />
            </div>
          </section>
        </header>
      </section>
      <PropertyList
        nameFilter={nameFilter}
        price={price}
        date={date ?? today}
        date2={date2 ?? tomorrow}
        range={range}
        star={star as number}
      />
    </>
  );
};
export default SearchProps;

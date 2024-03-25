"use client";

import { LogInIcon, LogOutIcon, SearchIcon } from "lucide-react";
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

const SearchProps = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [date2, setDate2] = React.useState<Date | undefined>(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Adding one day
    return tomorrow;
  });
  // const Property = [
  //   {
  //     name: "Your mom",
  //     location: "Ur mom's house",
  //     description: "mama",
  //     stars: 1.5,
  //     price: 1000,
  //     href: "/searchprop/PropInfo",
  //   },
  //   {
  //     name: "Your dad",
  //     location: "Ur dad's house",
  //     description: "dada",
  //     stars: 5.0,
  //     price: 3000,
  //     href: "/searchprop/PropInfo",
  //   },
  // ];

  const findProperty = trpc.host.accomodation.findAll.useQuery();

  if (findProperty.error) {
    return <div>Error: {findProperty.error.message}</div>;
  }

  if (findProperty.isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  const propertyData = findProperty.data;
  console.log(propertyData);

  const Property = propertyData?.flatMap(
    (entry: {
      name_a: any;
      distinct_a: any;
      description_a: any;
      rating: any;
      price: any;
      ggmap_link: any;
      accommodation_id: any;
    }) => ({
      name: entry.name_a,
      location: entry.distinct_a,
      description: entry.description_a,
      stars: entry.rating,
      price: entry.price,
      href: entry.ggmap_link,
      accom_id: entry.accommodation_id,
    }),
  );

  return (
    <>
      <section className="flex h-20 w-full flex-row items-center justify-start bg-blue-900">
        <header className="flex h-20 w-full flex-row items-center justify-center bg-blue-900">
          <div className="mx-10 w-full max-w-lg lg:max-w-xs">
            <div className="relative">
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
                placeholder="Text"
                type="search"
              />
            </div>
          </div>
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
      </section>
      <section className="flex justify-center ">
        <ul
          role="list"
          className="mt-3 grid w-full max-w-5xl grid-cols-1 gap-5"
        >
          {Property?.flatMap((desc) => (
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
                  stars={desc.stars}
                  price={desc.price}
                />
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
};
export default SearchProps;

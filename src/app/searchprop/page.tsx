"use client";

import { LogInIcon, LogOutIcon, SearchIcon } from "lucide-react";
import PropertyListCard from "@/components/card/PropertyList";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

const SearchProps = () => {
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
    return <div>Loading...</div>;
  }

  const propertyData = findProperty.data;
  console.log(propertyData);

  const Property = propertyData?.flatMap((entry) => ({
    name: entry.name_a,
    location: entry.distinct_a,
    description: entry.description_a,
    stars: entry.rating,
    price: entry.price,
    href: entry.ggmap_link,
  }));

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
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <LogInIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              23 Feb 2024
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <LogOutIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              24 Feb 2024
            </button>
          </span>
        </header>
      </section>
      <section className="flex justify-center ">
        <ul
          role="list"
          className="mt-3 grid w-full max-w-5xl grid-cols-1 gap-5"
        >
          {Property?.flatMap((desc) => (
            <Link href="searchprop/PropInfo">
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

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import PropertyAccomCard from "@/components/card/PropertyAccomCard";
import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

export default function HostProperties() {
  const { data: session } = useSession();
  if (session) {
    const findAccommodation = trpc.host.profile.findMany.useQuery({
      host_id: session?.user?.id,
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

    const accommodations = findAccommodation.data;

    //Create an array of objects with title, banner, and status properties for each accommodation
    const propertyData = accommodations.flatMap((entry) =>
      entry.accommodation.map((accommodation) => ({
        title: accommodation.name_a,
        banner: accommodation.banner,
        status: accommodation.accommodation_status,
        id: accommodation.accommodation_id,
      })),
    );

    return (
      <div className="px-4 py-4">
        {propertyData.map((property, index) => (
          <div key={index} className="mb-4">
            <Link
              href={{
                pathname: "/edit/host/accommodation",
                query: {
                  accommodation_id: property.id,
                },
              }}
            >
              <PropertyAccomCard
                title={property.title}
                imageUrl={
                  "accommodation/" + property.id + "/" + property.banner
                }
                status={property.status}
                id={property.id}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

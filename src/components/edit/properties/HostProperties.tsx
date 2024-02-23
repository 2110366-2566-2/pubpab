import Link from "next/link";
import { useSession } from "next-auth/react";

import PropertyAccomCard from "@/components/card/PropertyAccomCard";
import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

export default function HostProperties() {
  const { data: session } = useSession();
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
      banner: "/defaultAccommodation.webp",
      status: accommodation.accommodation_status,
      id: accommodation.accommodation_id,
    })),
  );

  // const propertyData = [
  //    { title: "Menorca Hotel", imageUrl: "/Menorca.webp", status: "Opened" },
  //    { title: "Bellagio Hotel", imageUrl: "/Bellagio.webp", status: "Closed" },
  //    { title: "East Hotel", imageUrl: "/easthotel.jpeg", status: "Opened" }
  //    // Add more property data as needed
  //  ];

  return (
    <div className="px-4 py-4">
      {propertyData.map((property, index) => (
        <div key={index} className="mb-4">
          <Link
            href={{
              pathname: "/edit/host/accomodation",
              query: {
                accommodation_id: property.id,
              },
            }}
          >
            <PropertyAccomCard
              title={property.title}
              imageUrl={property.banner}
              status={property.status}
              id={property.id}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

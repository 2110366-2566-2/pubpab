import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PropertyAccomCard from "@/components/card/PropertyAccomCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";


const formSchema = z
  .object({
    first_name: z
      .string()
      .max(64, "Firstname must be less than 64 characters long."),
    last_name: z
      .string()
      .max(64, "Lastname must be less than 64 characters long."),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Invalid email format.",
      ),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters long."),
    confirmed_password: z
      .string()
      .min(12, "Password must be at least 12 characters long."),
    phone_no: z
      .string()
      .length(10, "Invalid phone number format.")
      .regex(/^\d+$/, "Invalid phone number format."),
  })

export default function HostProperties() {
  const { data: session} = useSession();
  const findAccommodation = trpc.host.profile.findMany.useQuery({ host_id: session?.user?.id });

  if (findAccommodation.error) {
    return <div>Error: {findAccommodation.error.message}</div>;
  }
  
  if (findAccommodation.isLoading) {
    return <div>Loading...</div>;
  }
  
  const accommodations = findAccommodation.data;

  //Create an array of objects with title, banner, and status properties for each accommodation
  const propertyData = accommodations.flatMap(entry => entry.accommodation.map(accommodation => ({
    title: accommodation.name_a,
    banner: "/defaultAccommodation.webp",
    status: accommodation.accommodation_status,
    id: accommodation.accommodation_id
  })));

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
              }
            }}
          >
            <PropertyAccomCard
              title = {property.title}
              imageUrl = {property.banner}
              status = {property.status}
              id = {property.id}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
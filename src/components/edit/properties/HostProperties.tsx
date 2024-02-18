import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import PropertyAccomCard from "@/components/card/PropertyAccomCard";

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
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <Link href="/edit/host/accomodation">
          <PropertyAccomCard
            title="Menorca Hotel"
            imageUrl={"/Menorca.webp"}
            status="Opened"
          />
        </Link>
      </div>
      <div className="mb-4">
        {" "}
        {/* Add margin bottom of 4 */}
        <Link href="/edit/host/accomodation">
          <PropertyAccomCard
            title="Bellagio Hotel"
            imageUrl={"/Bellagio.webp"}
            status="Closed"
          />
        </Link>
      </div>
      <div className="mb-4">
        {" "}
        {/* Add margin bottom of 4 */}
        <Link href="/edit/host/accomodation">
          <PropertyAccomCard
            title="East Hotel"
            imageUrl={"/easthotel.jpeg"}
            status="Opened"
          />
        </Link>
      </div>
    </div>
  );
}
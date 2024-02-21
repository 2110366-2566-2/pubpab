"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PropertyAccomCard from "@/components/card/PropertyAccomCard";
import PropertyRoomCard from "@/components/card/PropertyRoomCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const formSchema = z.object({
  host_id: z.string(),
  name_a: z
    .string()
    .max(64, "Accomodation name must be less than 64 characters long."),
  description_a: z.string(),
  price: z.coerce.number(),
  qr_code: z.string(),
  address_a: z
    .string()
    .max(255, "Address must be less than 255 characters long."),
  city: z.string().max(100, "City must be less than 100 characters long."),
  province: z
    .string()
    .max(100, "Province must be less than 100 characters long."),
  distinct_a: z
    .string()
    .max(100, "District must be less than 100 characters long."),
  postal_code: z.string().length(5, "Invalid postal code format."),
  accommodation_status: z.enum(["OPEN", "CLOSE"]),
  ggmap_link: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
    ),
  rating: z.coerce
    .number()
    .max(
      5,
      "Oh! I think you're overrated your accommodation. You should be shame!",
    ),
});

export default function AccommodationAddForm() {
  const createAccommodation = trpc.host.accomodation.create.useMutation();
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host_id: session?.user?.id,
      rating: 0,
      accommodation_status: "OPEN",
      qr_code: "",
    },
    mode: "onBlur",
  });

  const onInvalid = (errors: unknown) => console.error(errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAccommodation.mutateAsync({
      ...values,
    });
    router.push("/");
  }
  return (
    <div>
      <Link href="/edit/host/profile">
        <Button className="text-grey-800 mt-15 mb-4 w-40 border border-black bg-[#F4EDEA] hover:text-white">
          Back
        </Button>
      </Link>
      <Card className="my-4 max-w-2xl flex-wrap gap-4 px-4 py-4">
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>Create your new property here.</CardDescription>
        </CardHeader>
        <div className="mb-4">
          <PropertyAccomCard
            imageUrl="/Menorca.webp"
            title="Menorca Hotel"
            status="Opened"
          />
        </div>
        <div className="mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="space-y-4 px-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="name_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Property Name"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Property Staring Price"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Property Description"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <label className="text-xl">Location</label>
              </div>
              <div className="w-full md:w-2/3">
                <FormField
                  control={form.control}
                  name="address_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        {/* Add margin bottom and right */}
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="distinct_a"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        {/* Add margin bottom */}
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="District"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        {" "}
                        {/* Add margin bottom and right */}
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Province"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        {" "}
                        {/* Add margin bottom */}
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Postal Code"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <FormField
                  control={form.control}
                  name="ggmap_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Map Link</FormLabel>
                      <FormControl>
                        <Input className="border border-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-4 flex flex-wrap gap-4">
                <Link href="/edit/host/room">
                  <PropertyRoomCard
                    imageUrl="/room1.jpeg"
                    title="Suite"
                    status="Available"
                  />
                </Link>
                <Link href="/edit/host/room">
                  <PropertyRoomCard
                    imageUrl="/room2.jpeg"
                    title="Superior room"
                    status="Available"
                  />
                </Link>
                <Link href="/edit/host/room">
                  <PropertyRoomCard
                    imageUrl="/room3.jpeg"
                    title="Deluxe room"
                    status="Unavailable"
                  />
                </Link>
              </div>
              <Button
                type="submit"
                className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
              >
                Add Property
              </Button>
              <Button className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white">
                Delete Property
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}

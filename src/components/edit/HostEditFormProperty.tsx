"use client";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import user from "/public/user.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropertyRoomCard from "../propertycard/PropertyRoomCard";
import PropertyCard from "../propertycard/PropertyCard";

const formSchema = z.object({
  citizen_id: z
    .string()
    .length(13, "Invalid Citizen ID.")
    .regex(/^\d+$/, "Invalid Citizen ID."),
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
  password: z.string().min(12, "Password must be at least 12 characters long."),
  birth_date: z.date(),
  phone_no: z
    .string()
    .length(10, "Invalid phone number format.")
    .regex(/^\d+$/, "Invalid phone number format."),
  gender: z.enum(["M", "F"]),
  address: z
    .string()
    .max(255, "Address must be less than 255 characters long."),
  city: z.string().max(100, "City must be less than 100 characters long."),
  province: z
    .string()
    .max(100, "Province must be less than 100 characters long."),
  district: z
    .string()
    .max(100, "District must be less than 100 characters long."),
  postalcode: z.string().length(5, "Invalid postal code format."),
});

export default function HostEditForm() {
  const mutation = trpc.user.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ ...values, user_type: "Travelers" });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Information</CardTitle>
        <CardDescription>Make changes to property here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PropertyCard
          imageUrl="/sk.jpeg"
          title="Long Building"
          status="Opened"
        />
        <div className="mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="first_name"
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
                  name="last_name"
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
                  name="address"
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
                    name="district"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
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
                    name="postalcode"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        {" "}
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
            </form>
          </Form>
        </div>
        <label className="text-xl font-bold">Rooms</label>
        <PropertyRoomCard
          title="Studio Rooms"
          imageUrl="/room1.jpeg"
          status="Available"
        />
        <PropertyRoomCard
          title="Deluxe Rooms"
          imageUrl="/room2.jpeg"
          status="Unavailable"
        />
        <PropertyRoomCard
          title="Suites Rooms"
          imageUrl="/room3.jpeg"
          status="Available"
        />
        <div>
          <Button
            type="submit"
            className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
          >
            Save changes
          </Button>
          <Button
            type="submit"
            className="text-grey-800 mt-15 w-40 border border-black bg-[#F4EDEA] hover:text-white"
          >
            Delete Property
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

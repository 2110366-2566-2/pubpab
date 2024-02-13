"use client";

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
import { Link } from "react-router-dom";

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

export default function HostEditProperties() {
  const mutation = trpc.user.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ ...values, user_type: "Travelers" });
  }
  return (
    <div className="mx-auto">
      <div className="mb-4 flex justify-between">
        <Button className="w-40">Back</Button>
        <Button
          type="submit"
          className="w-40 border border-black bg-[#F4EDEA] text-black"
        >
          Opened
        </Button>
      </div>
      <img src="/sk.jpeg" alt="Example" className="mr-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Properties Name"
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
                    placeholder="Properties Description"
                    className="border border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel className="text-xl">Location</FormLabel>
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
                name="district"
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
                name="postalcode"
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
          <div>
            <FormLabel className="text-2xl">Rooms</FormLabel>
          </div>
          <div className="flex">
            <div className="relative">
              <img src="/room1.jpeg" alt="Room 1" className="mr-2 h-60 w-80" />
              <span className="absolute right-2 top-0 bg-green-500 p-1 text-xs text-white">
                Available
              </span>
            </div>
            <div className="relative">
              <img src="/room2.jpeg" alt="Room 2" className="mr-2 h-60 w-80" />
              <span className="absolute right-2 top-0 bg-red-500 p-1 text-xs text-white">
                Unavailable
              </span>
            </div>
            <div className="relative">
              <img src="/room3.jpeg" alt="Room 3" className="mr-2 h-60 w-80" />
              <span className="absolute right-2 top-0 bg-green-500 p-1 text-xs text-white">
                Available
              </span>
            </div>
          </div>
          <Button type="submit" className="mt-10 w-40">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}

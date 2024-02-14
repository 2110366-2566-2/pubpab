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
import Image from "next/image";

const formSchema = z.object({
  name_a: z
    .string()
    .max(64, "Accomodation name must be less than 64 characters long."),
  description_a: z.string(),
  address_a: z
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
  accommodation_status: z.enum(["OPEN", "CLOSE"]),
});

export default function AdminVerifyProperties() {
  const getAccom = trpc.host.accomodation.findMany.useQuery({ id: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  //   mutation.mutate({ ...values, user_type: "Travelers" });
  // }
  return (
    <div className="mx-auto">
      <div className="mb-4 flex justify-start px-4">
        <Button className="text-grey-800 mr-11 w-40 border border-black bg-[#F4EDEA] hover:text-white">
          Profile
        </Button>
        <Button className="text-grey-800 w-40 border border-black bg-[#F4EDEA] hover:text-white">
          Property
        </Button>
        <Button className="text-grey-800 ml-auto w-40 border border-black bg-green-500 hover:bg-red-500 hover:text-white">
          Opened
        </Button>
      </div>
      <Image
        src="/sk.jpeg"
        alt="Long Building"
        className="mr-2 px-4"
        width={1000}
        height={300}
      />
      <Form {...form}>
        <form className="space-y-4 px-4">
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
                    readOnly
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
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";

import PropertyCard from "../propertycard/PropertyCard";
import { Input } from "../ui/input";

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

export default function HostEditProperties() {
  const mutation = trpc.host.accomodation.update.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ ...values, accommodation_id: "" });
  }
  return (
    <div className="mx-auto">
      <PropertyCard imageUrl="/sk.jpeg" title="Long Building" status="Opened" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
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
          {/* <Button type="submit" className="mt-10 w-40">
            Save changes
          </Button> */}
        </form>
      </Form>
    </div>
  );
}

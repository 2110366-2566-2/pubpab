"use client";

import pic from "@/../public/taeyeonToX.jpg";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
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

const allow = [
  { id: "Pet", label: "Pet" },
  { id: "Noise", label: "Noise" },
  { id: "Smoking", label: "Smoking" },
] as const;

const facility = [
  { id: "Wifi", label: "Wifi" },
  { id: "Restroom", label: "Restroom" },
  { id: "Washing Machine", label: "Washing Machine" },
] as const;

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

  name: z.string().max(64, "Name must be less than 64 characters long."),
  description: z
    .string()
    .max(64, "Description must be less than 64 characters long."),
  price: z.number().min(0, "Price must not be less than 0."),
  adult: z.number().min(0, "The number of adult must not be less than 0."),
  children: z
    .number()
    .min(0, "The number of children must not be less than 0."),

  allow: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),

  facility: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function AdminVerifyRoomForm() {
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
      {/* <div><Image src="/sk.jpg" fill={true} alt="Taengoo" className="mr-2" /></div> */}
      <Image src={pic} alt="Taengoo" className="w-400 mr-2" />
      {/* <Image src="/sk.jpg"  alt="Taengoo" className="mr-2" /> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    placeholder="Name"
                    className="border border-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    placeholder="Description"
                    className="border border-black"
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    placeholder="Price"
                    className="border border-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <FormField
                control={form.control}
                name="adult"
                render={({ field }) => (
                  <FormItem className="mb-4 mr-7">
                    {" "}
                    <FormLabel>Adult</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className="border border-black"
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
                name="children"
                render={({ field }) => (
                  <FormItem className="mb-4 mr-7">
                    {" "}
                    <FormLabel>Children</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className="border border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="allow"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Allow</FormLabel>
                </div>
                {allow.map((allow) => (
                  <FormField
                    key={allow.id}
                    control={form.control}
                    name="allow"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={allow.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              disabled
                              checked={field.value?.includes(allow.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, allow.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== allow.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {allow.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facility"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Facility</FormLabel>
                </div>
                {facility.map((facility) => (
                  <FormField
                    key={facility.id}
                    control={form.control}
                    name="facility"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={facility.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              disabled
                              checked={field.value?.includes(facility.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      facility.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== facility.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {facility.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

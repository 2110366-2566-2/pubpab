"use client";

import { toast } from "@/components/ui/use-toast";

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
  { id: "pet", label: "Pet" },
  { id: "noise", label: "Noise" },
  { id: "smoking", label: "Smoking" },
] as const;

const facility = [
  { id: "wifi", label: "Wifi" },
  { id: "restroom", label: "Restroom" },
  { id: "washingMachine", label: "Washing Machine" },
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

export default function HostEditRoomForm() {
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
                      <Input {...field} className="border border-black" />
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
                      <Input {...field} className="border border-black" />
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
                {allow.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="allow"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
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
                {facility.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="facility"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
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

          <div>
            <Button type="submit" className="ml-0 mr-2 mt-4">
              Save Changes
            </Button>
            <Button type="submit" className="mt-4">
              Delete Room
            </Button>
          </div>
          {/* <Button type="submit" className="mt-10">
                  Save Changes
                </Button>
                <Button type="submit" className="mt-10">
                  Delete Room
                </Button>
              </div> */}
        </form>
      </Form>
    </div>
  );
}
